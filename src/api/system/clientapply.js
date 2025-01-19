import request from '@/router/axios';

export const getList = (current, size, params) => {
  return request({
    url: '/api/blade-system/clientapply/list',
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
    url: '/api/blade-system/clientapply/detail',
    method: 'get',
    params: {
      id
    }
  })
}

export const remove = (ids) => {
  return request({
    url: '/api/blade-system/clientapply/remove',
    method: 'post',
    params: {
      ids,
    }
  })
}

export const add = (row) => {
  return request({
    url: '/api/blade-system/clientapply/save',
    method: 'post',
    data: row
  })
}

export const update = (row) => {
  return request({
    url: '/api/blade-system/clientapply/update',
    method: 'post',
    data: row
  })
}

export const batchPass = (ids) => {
    return request({
      url: '/api/blade-system/clientapply/batchPass',
      method: 'post',
      params: {
        ids,
      }
    })
  }

export const batchCancel = (ids) => {
    return request({
      url: '/api/blade-system/clientapply/batchCancel',
      method: 'post',
      params: {
        ids,
      }
    })
  }
  
export const updateLogoutPlace = (row) => {
  return request({
    url: '/api/blade-system/clientapply/updateLogoutPlace',
    method: 'post',
    data: row
  })
}