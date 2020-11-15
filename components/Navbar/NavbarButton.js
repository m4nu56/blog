import styles from './NavbarButton.module.scss'
import React from 'react'

export default function NavbarButton ({ title, active, href }) {
  return <a href={href} className={active ? styles.navbarButtonActive : styles.navbarButton}>{title}</a>
}
