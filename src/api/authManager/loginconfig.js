import request from '@/router/axios';

export const getList = (current, size, params) => {
  return request({
    url: '/api/blade-system/loginconfig/list',
    method: 'get',
    params: {
      ...params,
      current,
      size,
    }
  })
}

export const getDetail = (id) => {
  return request({
    url: '/api/blade-system/loginconfig/detail',
    method: 'get',
    params: {
      id
    }
  })
}

export const remove = (ids) => {
  return request({
    url: '/api/blade-system/loginconfig/remove',
    method: 'post',
    params: {
      ids,
    }
  })
}

export const add = (row) => {
  return request({
    url: '/api/blade-system/loginconfig/save',
    method: 'post',
    data: row
  })
}

export const update = (row) => {
  return request({
    url: '/api/blade-system/loginconfig/update',
    method: 'post',
    data: row
  })
}

export const submit = (row) => {
  return request({
    url: '/api/blade-system/loginconfig/submit',
    method: 'post',
    data: row
  })
}

export const getLastOne = (params) => {
  return request({
    url: '/api/blade-system/loginconfig/getLastOne',
    method: 'get',
    params: {...params}
  })
}
