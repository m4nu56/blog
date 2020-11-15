import Link from 'next/link'
import Footer from './Footer'
import React, { useEffect } from 'react'
import { initGA, logPageView } from './googleAnalytics.js'
import ProfilePicture from './ProfilePicture'

export const name = 'm4nu56'

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
