import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { GraphQLClient, gql } from 'graphql-request'
import { Posts } from '../models/graphql'
import { BlogPost } from '../components/BlogCard'

const graphcms = new GraphQLClient(process.env.CMS_API_URL as string)

const QUERY = gql`
	{
		posts {
			id
			title
			date_published
			slug
			content {
				html
			}
			author {
				name
				avatar {
					url
				}
			}
			cover_photo {
				url
			}
		}
	}
`

export async function getStaticProps() {
	const { posts }: Posts = await graphcms.request(QUERY)
	console.log(posts)

	// Always return something in the props with getStaticProps
	return {
		props: {
			posts,
		},
		revalidate: 10,
	}
}

const Home: NextPage<Posts> = ({ posts }) => {
	return (
		<div className={styles.container}>
			<Head>
				<title>Bloggy</title>
				<meta name="description" content="A blog website" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main className={styles.main}>
				{posts.map((post) => (
					<BlogPost
						key={post.id}
						// title={post.title}
						// author_id={post.author_id}
						// cover_photo={post.cover_photo}
						// date_published={post.date_published}
						// slug={post.slug}
						{...post}
					/>
				))}
			</main>
		</div>
	)
}

export default Home
