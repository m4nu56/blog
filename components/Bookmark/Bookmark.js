import styles from './Bookmark.module.scss'
import NavbarButton from '../Navbar/NavbarButton'
import { BiLoaderCircle } from 'react-icons/bi'
import { TwitterTweetEmbed } from 'react-twitter-embed'
import React from 'react'
import dynamic from 'next/dynamic';

const ReactTinyLink = dynamic(
  () => import('react-tiny-link').then(mod => mod.ReactTinyLink),
  { ssr: false }
)

export default function Bookmark ({ title, description, tags, tweetId, url }) {
  return (
    <div className={styles.bookmark}>
      <h2 className={styles.title}>{title}</h2>
      <p>{description}</p>
      <div className={styles.tagContainer}>
        {tags && tags.map(tag => <NavbarButton title={tag} active={true}/>)}
      </div>
      {false && tweetId != null && <div className={styles.tweetContainer}>
        <TwitterTweetEmbed
          tweetId={tweetId}
          placeholder={<BiLoaderCircle/>}
          options={{
            width: '100%',
          }}
        />
      </div>}
      {url != null && <div>
        <ReactTinyLink
          cardSize="large"
          showGraphic={true}
          loadSecureUrl={true}
          maxLine={2}
          minLine={1}
          url={url}
        />
      </div>}
    </div>
  )
}
