import Link from 'next/link'
import Footer from './Footer'
import React from 'react'
import Navbar from './Navbar/Navbar'
import styles from './Layout.module.scss'
import {useRouter} from 'next/router'

export const name = 'm4nu56'

export default function Layout({children}) {
    const router = useRouter()
    const isHome = router.route === "/"

    const isPosts = isHome || router.route.startsWith("/posts")
    const activeItem = isPosts ? 'POSTS' : 'BOOKMARKS'

    return (
        <>
            <header>
                <Navbar activeItem={activeItem}/>
            </header>

            <main className={styles.container}>{children}</main>

            {!isHome && (
                <div className={styles.container}>
                    <Link href="/">← Back to home </Link>
                </div>
            )}

            <Footer/>

        </>
    )
}
