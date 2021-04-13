<template>
	<div class="settings-page">
		<div class="container page">
			<div class="row">
				<div class="col-md-6 offset-md-3 col-xs-12">
					<h1 class="text-xs-center">Your Settings</h1>

					<form @submit.prevent="onSubmit">
						<fieldset>
							<fieldset class="form-group">
								<input
									class="form-control"
									type="text"
									placeholder="URL of profile picture"
									v-model="user.image"
								/>
							</fieldset>
							<fieldset class="form-group">
								<input
									class="form-control form-control-lg"
									type="text"
									placeholder="Your Name"
									v-model="user.username"
								/>
							</fieldset>
							<fieldset class="form-group">
								<textarea
									class="form-control form-control-lg"
									rows="8"
									placeholder="Short bio about you"
									v-model="user.bio"
								></textarea>
							</fieldset>
							<fieldset class="form-group">
								<input
									class="form-control form-control-lg"
									type="text"
									placeholder="Email"
									v-model="user.email"
								/>
							</fieldset>
							<fieldset class="form-group">
								<input
									class="form-control form-control-lg"
									type="password"
									placeholder="Password"
									v-model="password"
								/>
							</fieldset>
							<button class="btn btn-lg btn-primary pull-xs-right">
								Update Settings
							</button>
						</fieldset>
					</form>
					<hr />
					<button class="btn btn-outline-danger" @click="logout">
						Or click here to logout.
					</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { getUser, updateUser } from '../../api/user'
const Cookie = process.client ? require('js-cookie') : undefined
export default {
	name: 'SettingsIndex',
	middleware: 'authenticated',
	data() {
		return {
			user: {
				image: '',
				username: '',
				bio: '',
				email: '',
			},
			password: '',
		}
	},
	async mounted() {
		const { data } = await getUser()

		this.user.image = data.user.image
		this.user.username = data.user.username
		this.user.bio = data.user.bio
		this.user.email = data.user.email
	},
	methods: {
		// 提交登录
		async onSubmit() {
			try {
				let user = this.password
					? Object.assign(JSON.parse(JSON.stringify(this.user)), { password: this.password })
					: this.user
				const { data } = await updateUser(user)
				//重新保存用户
				// console.log(data)
				this.$store.commit('setUser', data.user)
				// //防止刷新页面数据丢失，把数据持久化
				Cookie.set('user', data.user)
				this.$router.push({
					name: 'profile',
					params: {
						username: data.user.username,
					},
				})
			} catch (err) {
				this.errors = err.response.data.errors
			}
		},
		logout() {
			Cookie.remove('user')
      	this.$store.commit('setUser', null)
      this.$router.push('/')
		},
	},
}
</script>

<style></style>
