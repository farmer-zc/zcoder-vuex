import request from '@/common/request'

export function getProductListApi (currentPage, pageNum) {
    return request({
        method: 'post',
        url: '/getProductList',
        data: {
            currentPage,
            pageNum
        }
    })
}
