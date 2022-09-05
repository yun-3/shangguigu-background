/* 
角色管理相关的API请求函数
*/
import request from '@/utils/request'

const api_name = '/admin/acl/role'


  /* 
  获取角色分页列表(带搜索)
  */
  export const getPageList=(page, limit, searchObj) =>request({
      url: `${api_name}/${page}/${limit}`,
      method: 'get',
      params: searchObj // url查询字符串或表单键值对
  })
  

  /* 
  获取某个角色
  */
  export const getByI=(id)=> request({
      url: `${api_name}/get/${id}`,
      method: 'get'
    })
  

  /* 
  保存一个新角色
  */
  export const save=(role)=> request({
      url: `${api_name}/save`,
      method: 'post',
      data: role
    })
  

  /* 
  更新一个角色
  */
  export const updateById=(role)=> request({
      url: `${api_name}/update`,
      method: 'put',
      data: role
    })
  

  /* 
  获取一个角色的所有权限列表
  */
  export const getAssign=(roleId)=> request({
      url: `${api_name}/toAssign/${roleId}`,
      method: 'get'
    })
  

  /* 
  删除某个角色
  */
  export const removeById=(id)=> request({
      url: `${api_name}/remove/${id}`,
      method: 'delete'
    })
  

  /* 
  批量删除多个角色
  */
  export const removeRoles=(ids)=> request({
      url: `${api_name}/batchRemove`,
      method: 'delete',
      data: ids
    })
  

