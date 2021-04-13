import axios from 'axios'
import { state } from '../store'
export const request = axios.create({
	baseURL: 'https://conduit.productionready.io',
})
// 通过插件机制 获取到上下文对象，包括query,params,req,store等
export default ({ store }) => {
	// 请求拦截器
	// 添加请求拦截器
	// 任何请求都要请过拦截器，在请求拦截其中做公共的业务处理，统一设置token
	request.interceptors.request.use(
		function(config) {
			// 使用nuxt插件
			const { user } = store.state
			if (user && user.token) {
				config.headers.Authorization = `Token ${store.state.user.token}`
			}
			return config
		},
		function(error) {
			// 此时请求还未发出，就会进入这里
			// 对请求错误做些什么
			return Promise.reject(error)
		}
	)
}
