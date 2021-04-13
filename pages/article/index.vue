<template>
	<div class="article-page">
		<div class="banner">
			<div class="container">
				<h1>{{ article.title }}</h1>
				<article-meta :article="article"></article-meta>
			</div>
		</div>

		<div class="container page">
			<div class="row article-content">
				<div class="col-md-12" v-html="article.body"></div>
				<ul class="tag-list">
					<!-- ngRepeat: tag in ::$ctrl.article.tagList -->
					<li class="tag-default tag-pill tag-outline " v-for="(tag, index) in article.tagList" :key="index">
						{{ tag }}
					</li>
					<!-- end ngRepeat: tag in ::$ctrl.article.tagList -->
				</ul>
			</div>

			<hr />

			<div class="article-actions">
				<article-meta :article="article"></article-meta>
			</div>

			<div class="row">
				<div class="col-xs-12 col-md-8 offset-md-2">
					<article-comment :article="article" />
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import ArticleMeta from './components/article-meta'
import { getArticle } from '../../api/article'
import MarkdownIt from 'markdown-it'
// import ArticleComment from './components/article-comment'
import ArticleComment from './components/article-comment.vue'

// import atricleMeta from './conmponents/atricle-meta.vue'
export default {
	components: { ArticleMeta, ArticleComment },
	name: 'ArticleIndex',
	
	async asyncData({ params }) {
		const { data } = await getArticle(params.slug)
		const md = new MarkdownIt()
		const { article } = data
		article.body = md.render(article.body)
		return {
			article: article,
		}
	},
	head() {
		return {
			title: `${this.article.title} - RealWorld`,
			meta: [
				{
					hid: `description`,
					name: 'description',
					content: this.article.description,
				},
			],
		}
	},
}
</script>

<style></style>
