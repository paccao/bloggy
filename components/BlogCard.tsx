import { Post } from '../models/graphql'
import Link from 'next/link'
import styles from '../styles/BlogCard.module.css'

export const BlogPost = ({
	title,
	author,
	cover_photo,
	date_published,
	slug,
}: Post) => {
	return (
		<section className={styles.card}>
			<Link href={'/posts/' + slug}>
				<div className={styles.imgContainer}>
					<img src={cover_photo.url} alt={`${title} hero image.`} />
				</div>
			</Link>
			<article className={styles.text}>
				<h2>{title}</h2>
				<div className={styles.details}>
					<div className={styles.author}>
						<img src={author.avatar.url} alt="Author avatar" />
						<h3>{author.name}</h3>
					</div>
					<div className={styles.date}>
						<h3>{date_published}</h3>
					</div>
				</div>
			</article>
		</section>
	)
}
