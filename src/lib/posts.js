import fs from 'fs'
import path from 'path'

const postsDirectory = path.join(process.cwd(), './src/pages/posts')

export function getSortedPostsData() {
    // Get file names under /pages/posts
    const fileNames = fs.readdirSync(postsDirectory)
    const allPostsData = fileNames.map(fileName => {
        let postPath = fileName
        if (!fileName.endsWith(".mdx")) {
            postPath = `${fileName}/index.mdx`
        }
        const {
            title,
            tags,
            publishDate,
            modifiedDate,
            seoDescription,
            exclude = false,
            ...moreMeta // any extra properties a post may have
        } = require(`../pages/posts/${postPath}`).meta;

        // Remove ".mdx" from file name to get id
        const id = fileName.replace(/\.mdx$/, '')

        // Combine the data with the id
        return {
            id,
            // Component,
            title,
            tags,
            publishDate,
            exclude
        }
    })
    return allPostsData
        .filter(post => post.exclude === false)
        .sort((a, b) => {
            if (a.publishDate < b.publishDate) {
                return 1
            } else {
                return -1
            }
        })
}

export function getAllPostIds() {
    const fileNames = fs.readdirSync(postsDirectory)

    // Returns an array that looks like this:
    // [
    //   {
    //     params: {
    //       id: 'ssg-ssr'
    //     }
    //   },
    //   {
    //     params: {
    //       id: 'pre-rendering'
    //     }
    //   }
    // ]
    return fileNames.map(fileName => {
        return {
            params: {
                id: fileName.replace(/\.mdx$/, '')
            }
        }
    })
}

