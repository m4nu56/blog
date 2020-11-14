import '../styles/global.scss'
import { MDXProvider } from '@mdx-js/react'
import Layout, { siteTitle } from '../components/layout'
import Head from 'next/head'
import CodeBlock from '../components/CodeBlock'
import Home from '.'

const mdComponents = {
  code: CodeBlock
}


export default function MyApp ({ Component, pageProps }) {
  return (
    <MDXProvider components={mdComponents}>
      <Layout home={Component == Home}>
        <Head>
          <title>{siteTitle}</title>
        </Head>
        <Component {...pageProps} />
      </Layout>
    </MDXProvider>
  )
}
