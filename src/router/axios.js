/**
 * 全站http配置
 *
 * axios参数说明
 * isSerialize是否开启form表单提交
 * isToken是否需要token
 */
import axios from 'axios';
import store from '@/store/';
import router from '@/router/router';
import {serialize} from '@/util/util';
import {getToken, removeToken, removeRefreshToken} from '@/util/auth';
import {Message} from 'element-ui';
import {isURL, validatenull} from "@/util/validate";
import website from '@/config/website';
import {Base64} from 'js-base64';
import { baseUrl } from '@/config/env';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import crypto from '@/util/crypto';

// 全局未授权错误提示状态，只提示一次
let isErrorShown = false;

//默认超时时间
axios.defaults.timeout = 10000;
//返回其他状态码
axios.defaults.validateStatus = function (status) {
  return status >= 200 && status <= 500;
};
//跨域请求，允许保存cookie
axios.defaults.withCredentials = true;
// NProgress 配置
NProgress.configure({
  showSpinner: false
});

// 全局锁机制：刷新token相关的状态
let isRefreshing = false; // 是否正在刷新token
let refreshTokenPromise = null; // 刷新token的Promise，用于等待刷新完成后执行其他请求

//http request拦截
axios.interceptors.request.use(config => {
  //开启 progress bar
  NProgress.start();
  // 初始化错误提示状态
  isErrorShown = false;
  //地址为已经配置状态则不添加前缀
  if (!isURL(config.url) && !config.url.startsWith(baseUrl)) {
    config.url = baseUrl + config.url;
  }
  //
//   config.headers['version'] = 'yzb'
  //安全请求header
  config.headers['Blade-Requested-With'] = 'BladeHttpRequest';
  //headers判断是否需要
  const authorization = config.authorization === false;
  if (!authorization) {
    config.headers['Authorization'] = `Basic ${Base64.encode(`${website.clientId}:${website.clientSecret}`)}`;
  }
  //headers判断请求是否携带token
  const meta = (config.meta || {});
  const isToken = meta.isToken === false;
  //headers传递token是否加密
  const cryptoToken = config.cryptoToken === true;
  //判断传递数据是否加密
  const cryptoData = config.cryptoData === true;
  const token = getToken();
  if (token && !isToken) {
    config.headers[website.tokenHeader] = cryptoToken
      ? 'crypto ' + crypto.encryptAES(token, crypto.cryptoKey)
      : 'bearer ' + token;
  }
  // 开启报文加密
  if (cryptoData) {
    if (config.params) {
      const data = crypto.encryptAES(JSON.stringify(config.params), crypto.aesKey);
      config.params = { data };
    }
    if (config.data) {
      config.text = true;
      config.data = crypto.encryptAES(JSON.stringify(config.data), crypto.aesKey);
    }
  }
  //headers中配置text请求
  if (config.text === true) {
    config.headers["Content-Type"] = "text/plain";
  }
  //headers中配置serialize为true开启序列化
  if (config.method === 'post' && meta.isSerialize === true) {
    config.data = serialize(config.data);
  }
  return config;
}, error => {
  return Promise.reject(error);
});

//http response拦截
axios.interceptors.response.use(res => {
  //关闭 progress bar
  NProgress.done();
  //获取配置信息
  const config = res.config;
  const cryptoData = config.cryptoData === true;
  //解析加密报文
  if (cryptoData) {
    res.data = JSON.parse(crypto.decryptAES(res.data, crypto.aesKey));
  }
  //获取状态信息
  const status = res.data.error_code || res.data.code || res.status;
  const statusWhiteList = website.statusWhiteList || [];
  const message = res.data.msg || res.data.error_description || '系统错误';
  //如果在白名单里则自行catch逻辑处理
  if (statusWhiteList.includes(status)) return Promise.reject(res);
  // 如果是401并且没有重试过，尝试刷新token
  if (status === 401 && !config._retry) {
    // 标记此请求已尝试刷新token
    config._retry = true;

    // 如果已经在刷新token，等待刷新完成再执行请求
    if (isRefreshing) {
      return refreshTokenPromise.then(() => {
        const meta = config.meta || {};
        const isToken = meta.isToken === false;
        const cryptoToken = config.cryptoToken === true;
        const token = getToken();
        if (token && !isToken) {
          config.headers[website.tokenHeader] = cryptoToken
            ? 'crypto ' + crypto.encryptAES(token, crypto.cryptoKey)
            : 'bearer ' + token;
        }
        return axios(config);
      });
    }

    // 标记正在刷新token
    isRefreshing = true;

    // 调用RefreshToken action来刷新token
    refreshTokenPromise = store.dispatch('RefreshToken')
      .then(() => {
        isRefreshing = false;
        const meta = config.meta || {};
        const isToken = meta.isToken === false;
        const cryptoToken = config.cryptoToken === true;
        // 获取刷新后的token
        const token = getToken();
        if (token && !isToken) {
          config.headers[website.tokenHeader] = cryptoToken
            ? 'crypto ' + crypto.encryptAES(token, crypto.cryptoKey)
            : 'bearer ' + token;
        }
        return axios(config);
      })
      .catch(() => {
        isRefreshing = false;
        // 首次报错时提示
        if (!isErrorShown) {
          isErrorShown = true;
          Message({
            message: '用户令牌过期，请重新登录',
            type: 'error',
          });
        }
        // 清除token信息
        removeToken();
        removeRefreshToken();
        // 重定向到登录页
        store.dispatch('FedLogOut').then(() => router.push({ path: '/login' }));
        return Promise.reject(new Error(message));
      });

    return refreshTokenPromise;
  }

  // 如果是401并且已经重试过，直接跳转到登录页面
  if (status === 401 && config._retry) {
    // 首次报错时提示
    if (!isErrorShown) {
      isErrorShown = true;
      Message({
        message: '用户令牌过期，请重新登录',
        type: 'error',
      });
    }
    // 清除token信息
    removeToken();
    removeRefreshToken();
    // 重定向到登录页
    store.dispatch('FedLogOut').then(() => router.push({ path: '/login' }));
    return Promise.reject(new Error(message));
  }

  // 如果请求为oauth2错误码则首次报错时提示
  if (status > 2000 && !validatenull(res.data.error_description)) {
    // 首次报错时提示
    if (!isErrorShown) {
      isErrorShown = true;
      Message({
        message: message,
        type: 'error',
      });
    }
    return Promise.reject(new Error(message));
  }

  // 如果请求为非200否者默认统一处理
  if (status !== 200) {
    Message({
      message: message,
      type: 'error'
    });
    return Promise.reject(new Error(message));
  }

  return res;
}, error => {
  NProgress.done();
  return Promise.reject(new Error(error));
});

export default axios;
