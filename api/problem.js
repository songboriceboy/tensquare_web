import request from '@/utils/request'

const group_name = 'qa'
const api_name = 'problem'
export default {
  list(type, label, page, size) {
    return request({
      url: `/${group_name}/${api_name}/${type}/${label}/${page}/${size}`,
      method: 'get'
    })
  },
  findById(id){
    return request({
      url:`/${group_name}/${api_name}/${id}`,
      method:'get'
    })
  },
  // 根据id查询标签
  labelNameListByuserId(userid){
    return request({
      url: `/${group_name}/${api_name}/${userid}`,
      method: 'get'
    })
  },
  // 发布问题
  save(pojo){
    return request({
      url:`/${group_name}/${api_name}`,
      method:'post',
      data:pojo
    })
  },
  //获取标签id集合
  getLabelList(problemId){
    return request({
      url:`/${group_name}/${api_name}/idList/${problemId}`,
      method:'get'
    })
  }

}
