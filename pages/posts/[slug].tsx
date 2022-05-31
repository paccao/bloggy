import styles from '../styles/Slug.module.css'
import { GraphQLClient, gql } from 'graphql-request'
import { PostObj, Slugs } from '../../models/graphql'

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
	const { post }: PostObj = await graphcms.request(QUERY, { slug })
	// Always return something in the props with getStaticProps
	return {
		props: {
			post,
		},
		revalidate: 10,
	}
}

const Slug = () => {}

export default Slug
