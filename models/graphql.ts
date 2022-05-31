export interface Post {
	id?: number
	title: string
	slug: string
	cover_photo: {
		url: string
	}
	content?: {
		html: string
	}
	date_published: string
	author_id: number
}

export interface Author { }

export interface Posts {
	posts: Post[]
}