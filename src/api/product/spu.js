// spu模块请求文件
import request from "@/utils/brand-request"

// 获取spu列表数据的接口
// /admin/product/{page}/{limit} get page limit category3Id
export const reqSpuList = (page,limit,category3Id)=>request({
    url:`/admin/product/${page}/${limit}`,
    method: "get",
    params:{category3Id}
})

// 获取某一个SPU信息接口
// /admin/product/getSpuById/{spuId}  get
export const reqSpu = (spuId)=>request({
    url:`/admin/product/getSpuById/${spuId}`,
    method: "get",
})

// 获取品牌信息
// GET /admin/product/baseTrademark/getTrademarkList
export const reqTradeMarkList = ()=>request({
    url:`/admin/product/baseTrademark/getTrademarkList`,
    method: "get",
})

// 获取spu图标的接口
// GET /admin/product/spuImageList/{spuId}
export const reqSpuImageList = (spuId)=>request({
    url:`/admin/product/spuImageList/${spuId}`,
    method: "get",
})

// 获取平台全部销售属性，销售属性总共就三个
// GET /admin/product/baseSaleAttrList
export const reqBaseSaleAttrList = ()=>request({
    url:`/admin/product/baseSaleAttrList`,
    method: "get",
})

// 修改spu|添加spu：对于修改或添加携带给服务器的参数大致一样，除了添加不带id
export const reqAddOrUpdateSpu = (spuInfo)=>{
    if(spuInfo.id){
        // 修改spu
        return request({url:'/admin/product/updateSpuInfo',method:"post",data:spuInfo})
    }else{
        // 添加spu
        return request({url:'/admin/product/saveSpuInfo',method:"post",data:spuInfo})
    }
}

// 删除spu
// /admin/product/deleteSpu/{spuId}  delete
export const reqDeleteSpu = (spuId)=>request({
    url:`/admin/product/deleteSpu/${spuId}`,
    method: "delete",
})


// 获取图片的数据
// /admin/product/spuImageList/{spuId} get
// export const reqSpuImageList = (spuId) => request({
//     url:`/admin/product/spuImageList/${spuId}`,
//     method: "get"
// })

// 获取销售属性的数据
// /admin/product/spuSaleAttrList/{spuId} get
export const reqSpuSaleAttrList = (spuId) => request({
    url:`/admin/product/spuSaleAttrList/${spuId}`,
    method: "get"
})

// 获取平台属性的数据
// /admin/product/attrInfoList/{category1Id}/{category2Id}/{category3Id} get
export const reqAttrInfoList = (category1Id,category2Id,category3Id) => request({
    url:`/admin/product/attrInfoList/${category1Id}/${category2Id}/${category3Id}`,
    method: "get"
})

// POST /admin/product/saveSkuInfo
export const reqAddSku = (skuInfo) => request({
    url:`/admin/product/saveSkuInfo`,
    method: "post",
    data:skuInfo
})

// 获取sku列表
// /admin/product/findBySpuId/{spuId} get
export const reqSkuList = (spuId) => request({
    url:`/admin/product/findBySpuId/${spuId}`,
    method: "get",
})