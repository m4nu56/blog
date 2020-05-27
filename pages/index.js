import styles from './index.module.css'
import { getSortedPostsData } from '../lib/posts'
import Link from 'next/link'
import Date from '../components/date'

export default function Home({ allPostsData }) {
  return (
    <React.Fragment>
      <section>
        <h2>Welcome</h2>
        <p>I'm a enthusiast Web Developer. I've been working with Java for about 10 years and I've been really serious with JavaScript for 2 years now.
          I love to learn and here on this blog I will share some of my experiments successful and also my failures..</p>
      </section>

      <section className={'pt-10'}>
        <ul>
          {allPostsData.map(({ id, publishDate, title }) => (
            <li key={id} className={'mt-5'}>
              <Link href="/posts/[id]" as={`/posts/${id}`}>
                <a className={styles.blogTitle}>{title}</a>
              </Link>
              <br />
              <small>
                <Date dateString={publishDate} />
              </small>
            </li>
          ))}
        </ul>
      </section>
    </React.Fragment>
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

