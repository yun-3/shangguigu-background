// sku模块请求文件
import request from "@/utils/brand-request"

// /admin/product/list/{page}/{limit} get
export const reqSkuList = (page,limit) => request({
    url:`/admin/product/list/${page}/${limit}`,
    method: "get"
})

// 上架
// GET /admin/product/onSale/{skuId}
export const reqSale = (skuId) => request({
    url:`/admin/product/onSale/${skuId}`,
    method: "get"
})

// 下架
// GET /admin/product/cancelSale/{skuId}
export const reqCancel = (skuId) => request({
    url:`/admin/product/cancelSale/${skuId}`,
    method: "get"
})

// 获取sku详情列表
// /admin/product/getSkuById/{skuId} get
export const reqSkuById = (skuId) => request({
    url:`/admin/product/getSkuById/${skuId}`,
    method: "get"
})