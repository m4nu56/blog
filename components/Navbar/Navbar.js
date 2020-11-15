import { name } from '../Layout'
import Image from 'next/image'
import React, { useState } from 'react'
import styles from './Navbar.module.scss'
import NavbarButton from './NavbarButton'
import Link from 'next/link'

export default function Navbar ({activeItem}) {
  const [mobileMenuVisible, setMobileMenuVisible] = useState(false)

  return (
    <nav className={styles.navbar}>
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <button
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:bg-gray-700 focus:text-white transition duration-150 ease-in-out"
              aria-label="Main menu" aria-expanded="false"
              onClick={() => setMobileMenuVisible(!mobileMenuVisible)}>
              <svg className={(mobileMenuVisible ? 'hidden' : 'block') + ' h-6 w-6'} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"/>
              </svg>
              <svg className={(mobileMenuVisible ? 'block' : 'hidden') + ' h-6 w-6'} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
          </div>
          <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
            <div className="hidden sm:block sm:ml-6 my-auto">
              <div className={styles.navBarButtonContainer}>
                <NavbarButton title="Posts" active={activeItem === 'POSTS'} href="/" />
                <NavbarButton title="Bookmarks" active={activeItem === 'BOOKMARKS'} href="/bookmarks"/>
              </div>
            </div>
          </div>

          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <div className="ml-3 relative">
              <div className='h-8 w-8'>
                <Link href="/"><a><Image
                  src="/images/profile.png"
                  alt={name}
                  layout='fill'
                  className="rounded-full"
                /></a></Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={(mobileMenuVisible ? 'block' : 'hidden') + ' sm:hidden'}>
        <div className="px-2 pt-2 pb-3">
          <NavbarButton title="Posts" active={activeItem === 'POSTS'} href="/" />
          <NavbarButton title="Bookmarks" active={activeItem === 'BOOKMARKS'} href="/bookmarks"/>
        </div>
      </div>
    </nav>
  )
}
