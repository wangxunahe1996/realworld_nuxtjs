<template>
	<div class="profile-page">
		<div class="user-info">
			<div class="container">
				<div class="row">
					<div class="col-xs-12 col-md-10 offset-md-1">
						<img :src="profile.image" class="user-img" />
						<h4>{{ profile.username }}</h4>
						<p>
							{{ profile.bio }}
						</p>

						<button
							class="btn btn-sm btn-outline-secondary action-btn"
							@click="onFllow(profile)"
							:disabled="profile.followDisabled"
							v-if="user.username != profile.username"
						>
							<i class="ion-plus-round"></i>
							&nbsp; {{ profile.following ? 'Unfollow Agilizei RWC' : 'Follow Eric Simons' }}
						</button>
						<nuxt-link class="btn btn-sm btn-outline-secondary action-btn" to="/settings" v-else>
							<i class="ion-plus-round"></i>
							&nbsp; Edit Profile Settings
						</nuxt-link>
					</div>
				</div>
			</div>
		</div>

		<div class="container">
			<div class="row">
				<div class="col-xs-12 col-md-10 offset-md-1">
					<div class="articles-toggle">
						<ul class="nav nav-pills outline-active">
							<li class="nav-item">
								<nuxt-link
									class="nav-link"
									:to="{
										name: 'profile',
										query: { tab: 'my_articles' },
										params: { username: profile.username },
									}"
									:class="{ active: tab == 'my_articles' }"
									exact
									>My Articles</nuxt-link
								>
							</li>
							<li class="nav-item">
								<nuxt-link
									class="nav-link"
									:to="{
										name: 'profile',
										query: { tab: 'favorited_articles' },
										params: { username: profile.username },
									}"
									:class="{ active: tab == 'favorited_articles' }"
									exact
									>Favorited Articles</nuxt-link
								>
							</li>
						</ul>
					</div>

					<div class="article-preview" v-for="article in articles" :key="article.slug">
						<div class="article-meta">
							<nuxt-link :to="{ name: 'profile', params: { username: article.author.username } }"
								><img :src="article.author.image"
							/></nuxt-link>
							<div class="info">
								<nuxt-link :to="{ name: 'profile', params: { username: article.author.username } }">{{
									article.author.username
								}}</nuxt-link>
								<span class="date">
									{{ article.createdAt | date('MMM DD, YYYY') }}
								</span>
							</div>
							<button
								class="btn btn-outline-primary btn-sm pull-xs-right"
								:class="{ active: article.favorited }"
								@click="onFavorite(article)"
								:disabled="article.favoriteDisabled"
							>
								<i class="ion-heart"></i> {{ article.favoritesCount }}
							</button>
						</div>
						<nuxt-link
							:to="{
								name: 'article',
								params: {
									slug: article.slug,
								},
							}"
							class="preview-link"
						>
							<h1>{{ article.Title }}</h1>
							<p>{{ article.description }}</p>
							<span>Read more...</span>
							<ul class="tag-list">
								<!-- ngRepeat: tag in $ctrl.article.tagList -->
								<li
									class="tag-default tag-pill tag-outline"
									v-for="(tag, index) in article.tagList"
									:key="index"
								>
									{{ tag }}
								</li>

								<!-- end ngRepeat: tag in $ctrl.article.tagList -->
							</ul>
						</nuxt-link>
					</div>
					<!-- 分页列表 -->
					<nav>
						<ul class="pagination">
							<li
								class="page-item"
								v-for="item in totalPage"
								:key="item"
								:class="{ active: item == page }"
							>
								<nuxt-link
									class="page-link ng-binding"
									:to="{
										name: 'profile',
										params: {
											username: profile.username,
										},
										query: {
											page: item,
											tab: tab,
										},
									}"
									>{{ item }}</nuxt-link
								>
							</li>
						</ul>
					</nav>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { getArticles, deleteFeedArticle, addFeedArticle } from '../../api/article'
import { getProfiles, addFollowProfile, deleteFollowProfile } from '../../api/user'
import { mapState } from 'vuex'
export default {
	name: 'ProfileIndex',
	middleware: 'authenticated',
	data() {
		return {}
	},
	watchQuery: ['page', 'tab'],
	async asyncData({ params, query, store }) {
		const username = params.username
		const page = Number.parseInt(query.page) || 1
		const tab = query.tab || 'my_articles'
		const limit = 5
		// 并行执行
		
		const [articleRes, userRes] = await Promise.all([
			getArticles({
				favorited: tab == 'my_articles' ? '' : username,
				author: tab == 'my_articles' ? username : '',
				limit: limit,
				offset: (page - 1) * limit,
			}),
			getProfiles(username),
		])
		const { articles, articlesCount } = articleRes.data
		const { profile } = userRes.data
		articles.forEach((article) => (article.favoriteDisabled = false))
		profile.followDisabled = false
		return {
			articles,
			articlesCount,
			// tags,
			limit,
			page,
			tab,
			profile,
		}
	},

	computed: {
		...mapState(['user']),
		totalPage() {
			return Math.ceil(this.articlesCount / this.limit)
		},
	},

	methods: {
		async onFavorite(article) {
			article.favoriteDisabled = true
			if (article.favorited) {
				await deleteFeedArticle(article.slug)
				article.favorited = false
				article.favoritesCount += -1
			} else {
				await addFeedArticle(article.slug)
				article.favorited = true
				article.favoritesCount += 1
			}
			article.favoriteDisabled = false
		},
		async onFllow(profile) {
			profile.followDisabled = true
			if (profile.following) {
				await deleteFollowProfile(profile.username)
				profile.following = false
			} else {
				await addFollowProfile(profile.username)
				profile.following = true
			}
			profile.followDisabled = false
		},
	},
}
</script>

<style></style>
