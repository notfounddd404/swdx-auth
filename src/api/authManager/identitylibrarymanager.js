import request from '@/router/axios';

export const getList = (current, size, params) => {
  return request({
    url: '/api/blade-system/identitylibrarymanager/list',
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
    url: '/api/blade-system/identitylibrarymanager/detail',
    method: 'get',
    params: {
      id
    }
  })
}

export const remove = (ids) => {
  return request({
    url: '/api/blade-system/identitylibrarymanager/remove',
    method: 'post',
    params: {
      ids,
    }
  })
}

export const add = (row) => {
  return request({
    url: '/api/blade-system/identitylibrarymanager/save',
    method: 'post',
    data: row
  })
}

export const update = (row) => {
  return request({
    url: '/api/blade-system/identitylibrarymanager/update',
    method: 'post',
    data: row
  })
}

export const submit = (row) => {
  return request({
    url: '/api/blade-system/identitylibrarymanager/submit',
    method: 'post',
    data: row
  })
}

export const getLastOne = (id) => {
  return request({
    url: '/api/blade-system/identitylibrarymanager/getLastOne',
    method: 'get',
    params: {
      id
    }
  })
}
