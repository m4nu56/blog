import React from 'react'
import { FaLinkedin, FaGithub, FaTwitter, FaDev, FaMedium } from 'react-icons/fa'
import styles from './Footer.module.scss'

const socials = [
    { href: 'https://twitter.com/m4nu56', icon: <FaTwitter size={'2em'} title='Twitter'/>, title: 'Twitter' },
    { href: 'https://github.com/m4nu56', icon: <FaGithub size={'2em'} title='Github'/>, title: 'Github' },
    { href: 'https://linkedin.com/in/emmanuelbalpe', icon: <FaLinkedin size={'2em'} title='LinkedIn'/>, title: 'LinkedIn' },
    { href: 'https://dev.to/m4nu56', icon: <FaDev size={'2em'} title='DEV.to'/>, title: 'DEV.to' },
    { href: 'https://medium.com/@mnu', icon: <FaMedium size={'2em'} title='Medium'/>, title: 'Medium' },
]

export default function Footer () {
    return (
      <div className={styles.footer}>
          {socials.map(({ title, href, icon }) =>
            <a href={href} className={styles.footerLink} title={title}>{icon}</a>,
          )}
          <div className={styles.copyrights}>
              <span>&copy;{new Date().getFullYear()} Emmanuel Balpe. All Rights Reserved.</span>
              <span>Built with <a href="https://www.nextjs.org">NextJS</a>.</span>
          </div>
      </div>
    )
}
