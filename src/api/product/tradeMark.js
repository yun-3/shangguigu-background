// 这个模块主要获取品牌管理的数据模块
import request from "@/utils/brand-request"
// /admin/product/baseTrademark/{page}/{limit}
export const reqTradeMarkList = (page, limit) => request({
  url: `/admin/product/baseTrademark/${page}/${limit}`,
  method: "get"
})

// 处理添加品牌的操作
// /admin/product/baseTrademark/save post (品牌名称，品牌logo)
// 切记：对于新增的品牌，给服务器传递数据，不用带ID，ID是服务器生成的

// 处理修改品牌操作
// /admin/product/baseTrademark/update put (id,品牌名称，品牌logo)
// 这两个接口几乎一样，可以封装成一个函数

export const reqAddUpdateTradeMark = (tradeMark) => {
  // 带给服务器的数据携带ID---修改
  if (tradeMark.id) {
    return request({
      url: `/admin/product/baseTrademark/update`,
      method: "put",
      data: tradeMark
    })
  } else {
    // 新增
    return request({
      url: `/admin/product/baseTrademark/save`,
      method: "post",
      data: tradeMark
    })
  }
}

// /admin/product/baseTrademark/remove/{id}  delete (品牌id)
export const reqDeleteTradeMark = (id) => request({
  url: `/admin/product/baseTrademark/remove/${id}`,
  method: "delete"
})