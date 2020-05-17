import useSWR from 'swr'
import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.css'
import { useState } from 'react'
import AutocompleteCommune from '@bit/dev10.ui-library.autocomplete-commune';
import { getSortedPostsData } from '../lib/posts'
import Link from 'next/link'
import Date from '../components/date'

export default function Home({ allPostsData }) {

  const [city, setCity] = useState(null)
  // const { data, error } = useSWR('https://api-test.seldon-finance.com/seldon/api/observatoire/communes', { fetcher: (...args) => fetch(...args).then(res => res.json()), refreshInterval: 0 })

  // if (error) return <div>failed to load</div>
  // if (!data) return <div>loading...</div>

  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>[Your Self Introduction]</p>
      </section>

      <section className={utilStyles.headingMd}>…</section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title }) => (
             <li className={utilStyles.listItem} key={id}>
             <Link href="/posts/[id]" as={`/posts/${id}`}>
               <a>{title}</a>
             </Link>
             <br />
             <small className={utilStyles.lightText}>
               <Date dateString={date} />
             </small>
           </li>
          ))}
        </ul>
      </section>

      {/* <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <ul>
          {data.data.map(city => <li>{city.nom}</li>)}
        </ul>
      </section> */}

      <section>
        <AutocompleteCommune apiUrl={'https://api-test.seldon-finance.com/seldon/api'}
          setError={error => console.error(error)}
          onChange={(e, city) => setCity(city)} />

        <h1>{city && city.nom}</h1>

      </section>

    </Layout>
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
