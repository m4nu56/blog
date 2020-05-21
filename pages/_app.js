import '../styles/global.css'
import { MDXProvider } from '@mdx-js/react'
import Layout, { siteTitle } from '../components/layout'
import Head from 'next/head'
import CodeBlock from '../components/CodeBlock'
import CodeBlockWithLineNumbers from '../components/CodeBlockWithLineNumbers'
import Home from '.'

const mdComponents = {
  h1: props => <h1 style={{ color: 'tomato' }} {...props} />,
  pre: props => <div {...props} />,
  code: CodeBlock
}


export default ({ Component, pageProps }) => {
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