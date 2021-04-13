import { request } from '../plugins/request'

//用户登录
export const login = (data) => {
	return request({
		method: 'POST',
		url: '/api/users/login',
		data,
	})
}
//用户注册
export const register = (data) => {
	return request({
		method: 'POST',
		url: '/api/users',
		data,
	})
}
//修改用户
export const updateUser = (data) => {
	return request({
		method: 'PUT',
		url: '/api/user',
		data,
	})
}
//获取当前用户信息
export const getUser = () => {
	return request({
		method: 'GET',
		url: '/api/user',
	})
}
//取得profile信息
export const getProfiles = (username) => {
	return request({
		method: 'GET',
		url: `/api/profiles/${username}`,
	})
}
//添加关注用户
export const addFollowProfile = (username) => {
	return request({
		method: 'POST',
		url: `/api/profiles/${username}/follow`,
	})
}
//删除关注用户
export const deleteFollowProfile = (username) => {
	return request({
		method: 'DELETE',
		url: `/api/profiles/${username}/follow`,
	})
}
