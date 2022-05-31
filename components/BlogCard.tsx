import { Post } from '../models/graphql'
import Link from 'next/link'
import styles from '../styles/BlogCard.module.css'

export const BlogPost = ({
	title,
	author_id,
	cover_photo,
	date_published,
	slug,
}: Post) => {
	return (
		<article className={styles.card}>
			<Link href={'/posts/' + slug}>
				<div className={styles.imgContainer}>
					<img src={cover_photo.url} alt={`${title} hero image.`} />
				</div>
			</Link>
		</article>
	)
}
