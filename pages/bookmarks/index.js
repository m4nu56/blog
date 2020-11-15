import Bookmark from '../../components/Bookmark/Bookmark'
import styles from './index.module.scss'

export default function Bookmarks () {
  return (
    <>
      <h1>Bookmarks</h1>

      <div className={styles.bookmarkContainer}>
        <Bookmark key={1} title="3D Perspective in CSS" description="How to create a 3D space in plain CSS." tags={['CSS', '3D']} tweetId='1326916915479142401'/>
        <Bookmark key={2} title="Oh Shit, Git!?!"
                  description="Git is hard: screwing up is easy, and figuring out how to fix your mistakes is fucking impossible. Git documentation has this chicken and egg problem where you can't search for how to get yourself out of a mess, unless you already know the name of the thing you need to know about in order to fix your problem.."
                  tags={['GIT']}
        url='https://ohshitgit.com/'/>
        <Bookmark key={3} title="m4nu56.dev" description="Developer blog" tags={[]} url='https://m4nu56.dev'/>
        <Bookmark key={4} title="Nullish Assignment operator `??=`." tags={['JS']} tweetId='1326533052529512448'/>
        <Bookmark key={5} title="`console.log({myVariable})`" tags={['JS']} tweetId='1326192332518133762'/>
      </div>
    </>
  )
}
