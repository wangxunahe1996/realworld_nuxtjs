<template>
	<div>
		<form class="card comment-form" @submit.prevent="onPostComment(article.slug)">
			<div class="card-block">
				<textarea
					class="form-control"
					placeholder="Write a comment..."
					rows="3"
					v-model="addComment.body"
				></textarea>
			</div>
			<div class="card-footer">
				<img :src="user.image" class="comment-author-img" />
				<button class="btn btn-sm btn-primary" :disabled="addCommentDisabled">
					Post Comment
				</button>
			</div>
		</form>

		<div class="card" v-for="(comment, index) in comments" :key="index">
			<div class="card-block">
				<p class="card-text">
					{{ comment.body }}
				</p>
			</div>
			<div class="card-footer">
				<nuxt-link
					:to="{ name: 'profile', params: { username: comment.author.username } }"
					class="comment-author"
				>
					<img :src="comment.author.image" class="comment-author-img" />
				</nuxt-link>
				&nbsp;
				<nuxt-link
					:to="{ name: 'profile', params: { username: comment.author.username } }"
					class="comment-author"
				>
					{{ comment.author.username }}
				</nuxt-link>
				<span class="date-posted">{{ comment.createdAt | date('MMM DD, YYYY') }}</span>
				<span class="mod-options" v-if="comment.author.username == user.username">
					<button
						class="ion-trash-a"
						style="border:0;"
						@click="onDeleteComment(article.slug, comment, index)"
						:disabled="comment.deleteDisabled"
					></button>
				</span>
			</div>
		</div>
	</div>
</template>

<script>
import { getComments, addComments, deleteComments } from '../../../api/article'
import { mapState } from 'vuex'
export default {
	name: 'ArticleComment',
	props: {
		article: {
			type: Object,
			required: true,
		},
	},
	computed: {
		...mapState(['user']),
	},
	data() {
		return {
			comments: [],
			addCommentDisabled: false,
			addComment: {
				body: '',
			},
		}
	},
	async mounted() {
		const { data } = await getComments(this.article.slug)
		this.comments = data.comments
		this.comments.forEach((item) => {
			item.deleteDisabled = false
		})
	},
	methods: {
		async onPostComment(slug) {
			this.addCommentDisabled = true
			const { data } = await addComments(slug, { comment: this.addComment })
			this.addCommentDisabled = false
			data.comment.deleteDisabled = false
			this.comments.unshift(data.comment)
			this.addComment.body = ''
		},
		async onDeleteComment(slug, comment, index) {
			comment.deleteDisabled = true
			await deleteComments(slug, comment.id)
			comment.deleteDisabled = false
			this.comments.splice(index, 1)
		},
	},
}
</script>

<style></style>
