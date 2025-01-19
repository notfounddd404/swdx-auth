import request from '@/router/axios';

export const getList = (current, size, params) => {
  return request({
    url: '/api/blade-system/systemconfig/list',
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
    url: '/api/blade-system/systemconfig/detail',
    method: 'get',
    params: {
      id
    }
  })
}

export const remove = (ids) => {
  return request({
    url: '/api/blade-system/systemconfig/remove',
    method: 'post',
    params: {
      ids,
    }
  })
}

export const add = (row) => {
  return request({
    url: '/api/blade-system/systemconfig/save',
    method: 'post',
    data: row
  })
}

export const update = (row) => {
  return request({
    url: '/api/blade-system/systemconfig/update',
    method: 'post',
    data: row
  })
}

export const submit = (row) => {
    return request({
      url: '/api/blade-system/systemconfig/submit',
      method: 'post',
      data: row
    })
  }

export const getLastOne = (id) => {
  return request({
    url: '/api/blade-system/systemconfig/getLastOne',
    method: 'get',
    params: {
      id
    }
  })
}