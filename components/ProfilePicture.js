import styles from './ProfilePicture.module.scss'
import Image from 'next/image'
import React from 'react'

export default function ProfilePicture () {
  return (
    <figure className={styles.imageContainer}>
      <Image
        src="/images/profile.png"
        alt="m4nu56"
        layout="fill"
        quality={100}
      />
    </figure>
  )
}
