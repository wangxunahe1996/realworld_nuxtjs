<template>
	<div class="article-meta">
		<nuxt-link :to="{ name: 'profile', params: { username: article.author.username } }"
			><img :src="article.author.image"
		/></nuxt-link>
		<div class="info">
			<nuxt-link :to="{ name: 'profile', params: { username: article.author.username } }" class="author">
				{{ article.author.username }}
			</nuxt-link>
			<span class="date">{{ article.createdAt | date('MMM DD, YYYY') }}</span>
		</div>
		<template v-if="user.username != article.author.username">
			<button
				class="btn btn-sm btn-outline-secondary "
				:class="{ active: article.author.following }"
				@click="onFllow(article.author)"
				:disabled="followDisabled"
			>
				<i class="ion-plus-round"></i>
				&nbsp; {{ article.author.following ? 'Unfollow Agilizei RWC' : 'Follow Eric Simons' }}
			</button>
			&nbsp;&nbsp;
			<button
				class="btn btn-outline-primary btn-sm "
				:class="{ active: article.favorited }"
				@click="onFavorite(article)"
				:disabled="favoriteDisabled"
			>
				<i class="ion-heart"></i>
				{{
					article.favorited
						? `Unavorite Post(${article.favoritesCount})`
						: `Favorite Post(${article.favoritesCount})`
				}}
			</button>
		</template>
		<template v-else>
			<nuxt-link
				class="btn btn-sm btn-outline-secondary"
				:to="{ name: 'editor', params: { slug: article.slug } }"
			>
				<i class="ion-edit"></i> Edit Article
			</nuxt-link>
			&nbsp;&nbsp;

			<button class="btn btn-sm btn-outline-danger" @click="onDelete(article.slug)" :disabled="deleteDisabled">
				<i class="ion-trash-a"></i> Delete Article
			</button>
		</template>
	</div>
</template>

<script>
import { mapState } from 'vuex'
import { deleteArticle, deleteFeedArticle, addFeedArticle } from '../../../api/article'
import { addFollowProfile, deleteFollowProfile } from '../../../api/user'
export default {
	name: 'ArticleMeta',
	props: {
		article: {
			typeof: Object,
			required: true,
		},
	},

	data() {
		return {
			deleteDisabled: false,
			followDisabled: false,
			favoriteDisabled: false,
		}
	},
	computed: {
		...mapState(['user']),
	},
	methods: {
		async onFavorite(article) {
			this.favoriteDisabled = true
			if (article.favorited) {
				await deleteFeedArticle(article.slug)
				article.favorited = false
				article.favoritesCount += -1
			} else {
				await addFeedArticle(article.slug)
				article.favorited = true
				article.favoritesCount += 1
			}
			this.favoriteDisabled = false
		},
		async onDelete(slug) {
			this.deleteDisabled = true
			await deleteArticle(slug)
			this.deleteDisabled = false
			this.$router.push('/')
		},
		async onFllow(author) {
			this.followDisabled = true
			if (author.following) {
				await deleteFollowProfile(author.username)
				author.following = false
			} else {
				await addFollowProfile(author.username)
				author.following = true
			}
			this.followDisabled = false
		},
	},
}
</script>

<style></style>
