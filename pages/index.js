import utilStyles from '../styles/utils.module.css'
import { getSortedPostsData } from '../lib/posts'
import Link from 'next/link'
import Date from '../components/date'

export default function Home({ allPostsData }) {
  return (
    <React.Fragment>
      <section className={utilStyles.headingMd}>
        <p>Fullstack Web Developer. Curious and eager to learn. Obsessed with code quality and clean code. Love to DevOps (thank's docker) but still very bad at it ;)</p>
      </section>

      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, publishDate, title }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href="/posts/[id]" as={`/posts/${id}`}>
                <a>{title}</a>
              </Link>
              <br />
              <small className={utilStyles.lightText}>
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

