import request from '@/utils/request'

const group_name = 'qa'
const api_name = 'reply'

export default {
  // 根据问题id查询回答
  findByProblemId(problemId) {
    return request({
      url:`/${group_name}/${api_name}/${problemId}`,
      method:'get'
    })
  }
}
