import Bookmark from '../../components/Bookmark/Bookmark'
import styles from './index.module.scss'
import bookmarks from '../../public/bookmarks.json'

export default function Bookmarks () {
  return (
    <>
      <h1>Bookmarks</h1>
      <div className={styles.bookmarkContainer}>
        {bookmarks
            .filter(bookmark => bookmark.tweetId == null)
            .map((bookmark, index) =>
          <Bookmark key={index} title={bookmark.title} description={bookmark.description} tags={bookmark.tags} tweetId={bookmark.tweetId} url={bookmark.url}/>)}
      </div>
    </>
  )
}
