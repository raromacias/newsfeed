import styles from './Profile.module.css'
import TopNewsContainer from '../TopNewsContainer/TopNewsContainer';
const Profile = ({newsArray, newsResults, loadMore, setLoadMore}) => {

 


  return (
      <div className={styles.wrapper}>
        {newsResults && (
    <TopNewsContainer 
      newsArray={newsArray} 
      newsResults={newsResults} 
      loadMore={loadMore} 
      setLoadMore={setLoadMore}
      />
      )}
      </div>
  )
}

export default Profile;