import styles from './index.module.scss'
import { getSortedPostsData } from '../lib/posts'
import Link from 'next/link'
import DateFormatter from '../components/DateFormatter'
import { FaArrowRight } from 'react-icons/fa'
import React from 'react'

export default function Home({ allPostsData }) {
  return (
    <>
      <h1>m4nu56</h1>
      <section>
        <h2>Welcome, my name is Emmanuel Balpe !</h2>
        <p>I'm a enthusiast Web Developer. I've been working with Java for about 10 years and I've been really serious with JavaScript for 2 years now.
          I love to learn new technologies, research and work through complex problems. I try to pay the highest attention to quality, I love to see my tests run green.</p>
        <p>I also love sharing my knowledge with others and talk about it.</p>
      </section>

      <section>
        <ul>
          {allPostsData.map(({ id, publishDate, title }) => (
            <li key={id} className={styles.listItem}>
              <Link href="/posts/[id]" as={`/posts/${id}`} className={styles.postTitle}>
                  <span><FaArrowRight size={15}/>{title}</span>
              </Link>
              <small>
                <DateFormatter dateString={publishDate}/>
              </small>
            </li>
          ))}
        </ul>
      </section>
    </>
  )
}

export async function getStaticProps() {
  const allPostsData = getSortedPostsData()
  return {
    props: {
      allPostsData
    }
  }
}

