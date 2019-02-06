import request from '@/utils/request'
import {getUser} from '@/utils/auth'
const api_group = 'base'
const api_name = 'label'
export default {
  toplist() {
    return request({
      url: `/${api_group}/${api_name}/toplist`,
      method: 'get'
    })
  },
  getLabNameListBy(labeId){
    return request({
      url:`/${api_group}/${api_name}/getLabNameList`,
      method:'get'
    })
  }
}
