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
	author: {
		name: string
		avatar: {
			url: string
		}
	}
}

export interface Author { }

export interface Posts {
	posts: PostResponse[]
}

export interface Post {
	title: string
	author: {
		name: string
		avatar: {
			url: string
		}
	}
	cover_photo: { url: string }
	date_published: string
	slug: string
}

export interface PostObj {
	post: Post
}

export interface PostObjWithContent {
	post: PostWithContent
}

export interface PostWithContent {
	title: string
	author: {
		name: string
		avatar: {
			url: string
		}
	}
	cover_photo: { url: string }
	date_published: string
	slug: string
	content: {
		html: string
	}
}
export interface Slugs {
	posts: SlugResponse[]
}

export interface SlugResponse {
	slug: string
}