import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import remark from 'remark'
import html from 'remark-html'
import mdx from 'remark-mdx'
import { cpus } from 'os'

const postsDirectory = path.join(process.cwd(), './pages/posts')

export function getSortedPostsData() {
    // Get file names under /pages/posts
    const fileNames = fs.readdirSync(postsDirectory)
    console.log('ffff', fileNames)
    const allPostsData = fileNames.map(fileName => {
        const { default: Component } = require(`../pages/posts/${fileName}`);
        const {
            title,
            tags,
            layout,
            publishDate,
            modifiedDate,
            seoDescription,
            hideProgressBar = false,
            exclude = false,
            ...moreMeta // any extra properties a post may have
        } = require(`../pages/posts/${fileName}`).meta;


        // Remove ".mdx" from file name to get id
        const id = fileName.replace(/\.mdx$/, '')

        // // Read markdown file as string
        // const fullPath = path.join(postsDirectory, fileName)
        // const fileContents = fs.readFileSync(fullPath, 'utf8')

        // // Use gray-matter to parse the post metadata section
        // const matterResult = matter(fileContents)

        // Combine the data with the id
        return {
            id,
            // Component,
            title,
            tags,
            layout,
            publishDate
        }
    })
    // Sort posts by date
    return allPostsData.sort((a, b) => {
        if (a.date < b.date) {
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

export async function getPostData(id) {
    const fullPath = path.join(postsDirectory, `${id}.md`)
    const fileContents = fs.readFileSync(fullPath, 'utf8')

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents)

    // Use remark to convert markdown into HTML string
    const processedContent = await remark()
        .use(mdx)
        .process(matterResult.content)
    const contentHtml = processedContent.toString()

    // Combine the data with the id and contentHtml
    return {
        id,
        contentHtml,
        ...matterResult.data
    }
}
