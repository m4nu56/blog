import Head from 'next/head'
import styles from './layout.module.css'
import Link from 'next/link'
import Footer from './Footer'

const name = 'm4nu56'
export const siteTitle = 'Personal dev blog'

export default function Layout({ children, home }) {
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
          <>
            <img
              src="/images/profile.png"
              className={`rounded-full mx-auto`}
              style={{ maxWidth: '10rem' }}
              alt={name}
            />
            <h1 className={''}>{name}</h1>
          </>
        ) : (
            <Link href="/">
              <a>
                <img
                  src="/images/profile.png"
                  className={`rounded-full mx-auto`}
                  style={{ maxWidth: '6rem' }}
                  alt={name}
                />
              </a>
            </Link>
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
