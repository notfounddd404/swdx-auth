import request from '@/router/axios';

export const getList = (current, size, params) => {
  return request({
    url: '/api/blade-system/authconfig/list',
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
    url: '/api/blade-system/authconfig/detail',
    method: 'get',
    params: {
      id
    }
  })
}

export const remove = (ids) => {
  return request({
    url: '/api/blade-system/authconfig/remove',
    method: 'post',
    params: {
      ids,
    }
  })
}

export const add = (row) => {
  return request({
    url: '/api/blade-system/authconfig/save',
    method: 'post',
    data: row
  })
}

export const update = (row) => {
  return request({
    url: '/api/blade-system/authconfig/update',
    method: 'post',
    data: row
  })
}

export const getLastOne = (id) => {
  return request({
    url: '/api/blade-system/authconfig/getLastOne',
    method: 'get',
    params: {
      id
    }
  })
}

export const submit = (row) => {
  return request({
    url: '/api/blade-system/authconfig/submit',
    method: 'post',
    data: row
  })
}