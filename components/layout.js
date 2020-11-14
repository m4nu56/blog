import Head from 'next/head'
import Link from 'next/link'
import Footer from './Footer'
import React, { useEffect } from 'react'
import { initGA, logPageView } from './googleAnalytics.js'
import ProfilePicture from './ProfilePicture'

export const name = 'm4nu56'
export const siteTitle = '(Yet) Another personal developer blog'

export default function Layout ({ children, home }) {

  useEffect(() => {
    if (!window.GA_INITIALIZED) {
      initGA()
      window.GA_INITIALIZED = true
    }
    logPageView()
  }, [])

  return (
    <div className={'container'}>
      <Head>
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png"/>
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png"/>
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png"/>
        <link rel="manifest" href="/site.webmanifest"/>
        <meta name="description" content={siteTitle}/>
        <meta
          property="og:image"
          content={`https://og-image.now.sh/${encodeURI(
            siteTitle,
          )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
        />
        <meta name="og:title" content={siteTitle}/>
        <meta name="twitter:card" content="summary_large_image"/>
      </Head>
      <header className={'container'}>
        <ProfilePicture home={home}/>
      </header>

      <main>{children}</main>

      {!home && (
        <div className={'mt-10'}>
          <Link href="/">
            <a>← Back to home</a>
          </Link>
        </div>
      )}

      <Footer/>

    </div>
  )
}
