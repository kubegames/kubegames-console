import axios from 'axios'
import store from '@/store/index';
import router from '@/routes'
import { VueAxios } from './axios'

const url = "http://127.0.0.1:8080"

// create axios
const request = axios.create({
  baseURL: url
})

// request interceptor
request.interceptors.request.use(config => {
  config.headers['Authorization'] = store.state.user.token;
  return config
}, async function (error){
  console.log("request",error);
  return Promise.reject(error)
})

// response interceptor
request.interceptors.response.use((response) => {
  return response.data
}, async function (error) {
  //check auth
  if (error.response.status === 401) {
    store.dispatch('Logout');
    router.push("/login");
  }
  console.log("response",error.response.data)
  //return
  return Promise.reject(error.response.data)
})


const installer = {
  vm: {},
  install (Vue) {
    Vue.use(VueAxios, request)
  }
}

export default request

export {
  installer as VueAxios,
  request as axios
}
