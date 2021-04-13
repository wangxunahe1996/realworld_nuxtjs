<template>
	<div class="editor-page">
		<div class="container page">
			<div class="row">
				<div class="col-md-10 offset-md-1 col-xs-12">
					<form>
						<fieldset>
							<fieldset class="form-group">
								<input
									type="text"
									class="form-control form-control-lg"
									placeholder="Article Title"
									v-model="article.title"
								/>
							</fieldset>
							<fieldset class="form-group">
								<input
									type="text"
									class="form-control"
									placeholder="What's this article about?"
									v-model="article.description"
								/>
							</fieldset>
							<fieldset class="form-group">
								<textarea
									class="form-control"
									rows="8"
									placeholder="Write your article (in markdown)"
									v-model="article.body"
								></textarea>
							</fieldset>
							<fieldset class="form-group">
								<input
									type="text"
									class="form-control"
									placeholder="Enter tags"
									v-model="tagInput"
									@keyup.enter="addTag"
								/>
								<div class="tag-list">
									<span
										class="tag-default tag-pill"
										v-for="(tag, index) in article.tagList"
										:key="index"
									>
										<i class="ion-close-round" @click="deleteTag(index)"></i>
										{{ tag }}
									</span>
								</div>
							</fieldset>
							<button
								class="btn btn-lg pull-xs-right btn-primary"
								type="button"
								@click="onSubmit"
								:disabled="publishDisabled"
							>
								Publish Article
							</button>
						</fieldset>
					</form>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { createArticle, editorArticle, getArticle } from '../../api/article'
export default {
	name: 'EditorIndex',
	middleware: 'authenticated',
	data() {
		return {
			article: {
				title: '',
				description: '',
				body: '',
				tagList: [],
			},
			publishDisabled: false,
			tagInput: '',
		}
	},
	async mounted() {
		const slug = this.$route.params.slug
		if (slug) {
			const { data } = await getArticle(slug)
			this.article.title = data.article.title
			this.article.description = data.article.description
			this.article.body = data.article.body
			this.article.tagList = data.article.tagList
		}
	},
	methods: {
		// 添加tag
		addTag() {
			if (this.tagInput) {
				this.article.tagList.push(this.tagInput)

				this.tagInput = ''
			}
		},
		//删除tag
		deleteTag(index) {
			this.article.tagList.splice(index, 1)
		},
		//发布文章
		async onSubmit() {
			this.publishDisabled = true
			const { data } = await createArticle({ article: this.article })
			this.publishDisabled = false
			this.$router.push({
				name: 'article',
				params: {
					slug: data.article.slug,
				},
			})
		},
	},
}
</script>

<style></style>
