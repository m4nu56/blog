import Head from 'next/head'
import styles from './layout.module.css'
import Link from 'next/link'
import Footer from './Footer'
import React, { useEffect } from 'react'
import { initGA, logPageView } from './googleAnalytics.js'
import Image from 'next/image'

const name = 'm4nu56'
export const siteTitle = 'Personal dev blog'

export default function Layout({ children, home }) {

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
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="Another developer personal blog..."
        />
        <meta
          property="og:image"
          content={`https://og-image.now.sh/${encodeURI(
            siteTitle
          )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
        />
        <meta name="og:title" content={siteTitle} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <header className={'container'}>
        {home ? (
          <div className={`text-center`}>
            <Image
              src="/images/profile.png"
              alt={name}
              width={90}
              height={90}
              quality={100}
              className='rounded-full'
            />
            <h1>{name}</h1>
          </div>
        ) : (
          <div className={`text-center`}>
            <Link href="/">
              <a>
                <Image
                  src="/images/profile.png"
                  alt={name}
                  width={50}
                  height={50}
                  quality={100}
                  className='rounded-full'
                />
              </a>
            </Link>
          </div>
          )}
      </header>


      <main>{children}</main>

      {!home && (
        <div className={'mt-10'}>
          <Link href="/">
            <a>← Back to home</a>
          </Link>
        </div>
      )}

      <Footer />

    </div>
  )
}
