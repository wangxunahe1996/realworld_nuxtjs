import { request } from '../plugins/request'
//获取公共的文章列表
export const getArticles = (params) => {
	return request({
		method: 'GET',
		url: '/api/articles',
		params,
	})
}
// 获取用户关注的文章列表
export const getFeedArticles = (params) => {
	return request({
		method: 'GET',
		url: '/api/articles/feed',
		params,
	})
}
// 添加点赞
export const addFeedArticle = (slug) => {
	return request({
		method: 'POST',
		url: `/api/articles/${slug}/favorite`,
	})
}
// 取消点赞
export const deleteFeedArticle = (slug) => {
	return request({
		method: 'DELETE',
		url: `/api/articles/${slug}/favorite`,
	})
}
// 获取文章详情
export const getArticle = (slug) => {
	return request({
		method: 'GET',
		url: `/api/articles/${slug}`,
	})
}
// 获取文章评论
export const getComments = (slug) => {
	return request({
		method: 'GET',
		url: `/api/articles/${slug}/comments`,
	})
}
// 添加文章评论
export const addComments = (slug, data) => {
	return request({
		method: 'POST',
		url: `/api/articles/${slug}/comments`,
		data,
	})
}
// 文章删除评论
export const deleteComments = (slug, id) => {
	return request({
		method: 'DELETE',
		url: `/api/articles/${slug}/comments/${id}`,
	})
}
//发布文章
export const createArticle = (data) => {
	return request({
		method: 'POST',
		url: `/api/articles`,
		data,
	})
}
//修改文章
export const editorArticle = (slug) => {
	return request({
		method: 'PUT',
		url: `/api/articles/${slug}`,
	})
}
//删除文章
export const deleteArticle = (slug) => {
	return request({
		method: 'DELETE',
		url: `/api/articles/${slug}`,
	})
}
