import request from '@/utils/request'
const group_name='gathering'
const api_name='gathering'

export default {
  //加载 分页 搜索
  search(page, size, searchMap) {
    return request({
      url: `/${group_name}/${api_name}/search/${page}/${size}`,
      method: 'post',
      data: searchMap
    })
  },
  //新增保存
  save(pojo) {
    return request({
      url: `/${group_name}/${api_name}`,
      method: 'post',
      data: pojo
    })
  },
  //根据id查询
  findById(id) {
    return request({
        url: `/${group_name}/${api_name}/${id}`,
        method: 'get'
      }
    )
  },
  //保存修改
  update(id,pojo){
    if (id==''||id==null){
      return this.save(pojo)
    }
    return request({
      url:`/${group_name}/${api_name}/${id}`,
      method:'put',
      data:pojo
    })
  },
  //删除
  delete(id){
    return request({
      url:`/${group_name}/${api_name}/${id}`,
      method:'delete'
    })
  }
}
