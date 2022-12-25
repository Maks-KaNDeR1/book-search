

export type BooksType = {
    kind: string
    totalItems: number
    items: BookType[]
}

export type BookType = {
    etag: string
    id: string
    kind: string
    saleInfo: {}
    searchInfo: {
        textSnippet: string
    }
    selfLink: string
    volumeInfo: {
        title: string
        authors: [
            string
        ],
        publisher: string
        publishedDate: string
        description: string
        imageLinks: {
            smallThumbnail: string
            thumbnail: string
        }
        categories: string[]
    },
}
