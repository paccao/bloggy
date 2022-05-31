import styles from '../../styles/Slug.module.css'
import { GraphQLClient, gql } from 'graphql-request'
import { PostObj, PostObjWithContent, Slugs } from '../../models/graphql'

const graphcms = new GraphQLClient(process.env.CMS_API_URL as string)

const QUERY = gql`
	query Post($slug: String!) {
		post(where: { slug: $slug }) {
			id
			title
			slug
			date_published
			author {
				id
				name
				avatar {
					url
				}
			}
			content {
				html
			}
			cover_photo {
				id
				url
			}
		}
	}
`

const SLUGLIST = gql`
	{
		posts {
			slug
		}
	}
`

export async function getStaticPaths() {
	const { posts }: Slugs = await graphcms.request(SLUGLIST)
	return {
		paths: posts.map((post) => ({ params: { slug: post.slug } })),
		fallback: false,
	}
}

export async function getStaticProps({ params }: { params: any }) {
	const slug = params.slug
	const { post }: PostObjWithContent = await graphcms.request(QUERY, { slug })
	// Always return something in the props with getStaticProps
	return {
		props: {
			post,
		},
		revalidate: 10,
	}
}

const Slug = ({ post }: PostObjWithContent) => {
	return (
		<main className={styles.blog}>
			<img
				className={styles.cover}
				src={post.cover_photo.url}
				alt="Post cover photo"
			/>
			<div className={styles.authdetails}>
				<img src={post.author.avatar.url} alt="Post author's avatar" />
				<div className={styles.authtext}>
					<h6>By {post.author.name}</h6>
					<h6 className={styles.data}>{post.date_published}</h6>
				</div>
			</div>
			<h2>{post.title}</h2>
			<div
				className={styles.content}
				dangerouslySetInnerHTML={{ __html: post.content.html }}
			></div>
		</main>
	)
}

export default Slug
