import styles from './Profile.module.css'
import TopNewsContainer from '../TopNewsContainer/TopNewsContainer';
import Weather from '../Weather/Weather';

const Profile = ({newsArray, newsResults, loadMore, setLoadMore}) => {

 


  return (
      <div className={styles.wrapper}>
        <Weather />
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