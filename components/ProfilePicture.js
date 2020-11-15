import styles from './ProfilePicture.module.scss'
import Image from 'next/image'
import Link from 'next/link'
import { name } from './layout'
import React from 'react'

export default function ProfilePicture ({ home }) {
  if (home) {
    return (
      <>
        <figure className={styles.imageContainer}>
          <Image
            src="/images/profile.png"
            alt={name}
            width={90}
            height={90}
          />
        </figure>
        <h1>{name}</h1>
      </>
    )
  }
  return (
    <figure className={styles.imageContainer}>
      <Link href="/"><a><Image
        src="/images/profile.png"
        alt={name}
        width={90}
        height={90}
      /></a></Link>
    </figure>
  )
}
