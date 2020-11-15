import Link from 'next/link'
import Footer from './Footer'
import React, { useEffect } from 'react'
import { initGA, logPageView } from './googleAnalytics.js'
import ProfilePicture from './ProfilePicture'
import Navbar from './Navbar/Navbar'
import styles from './Layout.module.scss'
import { useRouter } from 'next/router'

export const name = 'm4nu56'

export default function Layout ({ children }) {
  const router = useRouter()
  const isHome = router.route === "/"

  const isPosts =  isHome || router.route.startsWith("/posts")
  const activeItem = isPosts ? 'POSTS' : 'BOOKMARKS'

  useEffect(() => {
    if (!window.GA_INITIALIZED) {
      initGA()
      window.GA_INITIALIZED = true
    }
    logPageView()
  }, [])

  return (
    <>
      <header>
        <Navbar activeItem={activeItem}/>
      </header>

      <main className={styles.container}>{children}</main>

      {!isHome && (
        <div className={styles.container}>
          <Link href="/">
            <a>← Back to home</a>
          </Link>
        </div>
      )}

      <Footer/>

    </>
  )
}
