import axios from 'axios'
import {getUser} from "@/utils/auth";
//创建axios实例
const service=axios.create({
  baseURL:'https://www.easy-mock.com/mock/5c3c576683a6d6013cad25cd',//api的base_url
  timeout:30000, //请求超时
  headers:{'Authorization':'Bearer'+getUser().token}
})
export default service
