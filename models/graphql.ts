export interface PostResponse {
	id: number
	title: string
	date_published: string
	slug: string
	content: {
		html: string
	}
	cover_photo: {
		url: string
	}
	author: { name: string; avatar: {} }
}

export interface Author { }

export interface Posts {
	posts: PostResponse[]
}

export interface Post {
	title: string
	author: {
		name: string
		avatar: {}
	}
	cover_photo: { url: string }
	date_published: string
	slug: string
}