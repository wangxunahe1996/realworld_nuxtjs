const cookieparser = process.server ? require('cookieparser') : undefined
// 函数，为了在服务端渲染期间运行的都是同一个实例
// 防止数据冲突，返回数据对象
export const state = () => {
	return {
		// 当前用户的登录状态
		user: null,
	}
}

export const mutations = {
	setUser(state, data) {
		state.user = data
	},
}

export const actions = {
    // 特殊的action方法
    // 仅在服务端渲染时候调用
    // 作用：初始化容器数据，在客户端使用
	nuxtServerInit({ commit }, { req }) {
        // console.log('1')
		let user = null
		if (req.headers.cookie) {
			const parsed = cookieparser.parse(req.headers.cookie)
			try {
				user = JSON.parse(parsed.user)
			} catch (err) {
				// No valid cookie found
			}
		}
		commit('setUser', user)
	},
}
