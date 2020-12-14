import '../styles/global.scss'
import { MDXProvider } from '@mdx-js/react'
import Layout from '../components/Layout'
import Head from 'next/head'
import CodeBlock from '../components/CodeBlock'
import SEO from '../next-seo.config'
import { DefaultSeo } from 'next-seo'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import * as gtag from '../lib/gtag'

const mdxComponents = {
  code: CodeBlock,
}


export default function MyApp ({ Component, pageProps }) {

  const router = useRouter()
  useEffect(() => {
    const handleRouteChange = (url) => {
      gtag.pageview(url)
    }
    router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])

  return (
    <MDXProvider components={mdxComponents}>
      <Layout>
        <Head>
          <title>{SEO.title}</title>
          <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png"/>
          <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png"/>
          <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png"/>
          <link rel="manifest" href="/site.webmanifest"/>
        </Head>
        <DefaultSeo {...SEO} />
        <Component {...pageProps} />
      </Layout>
    </MDXProvider>
  )
}
