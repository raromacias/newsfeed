import styles from './Profile.module.css'
import TopNewsContainer from '../TopNewsContainer/TopNewsContainer';
import Weather from '../Weather/Weather';

const Profile = ({newsArray, newsResults, loadMore, setLoadMore}) => {

 


  return (
      <div className={styles.wrapper}>
        <div className={styles.dailybanner}>
        <div className={styles.infodiv}>
          <h2 className={styles.welcome}>Your daily news</h2>
          <div className={styles.datediv}>
          {new Date().toLocaleString(window.navigator.language, {weekday :'long'})}{', '}
          {new Date().toLocaleString("en-US", {month :'long'})}{' '}
          {new Date().toLocaleString("en-US", {day :'2-digit'})}
          </div>  
        </div>
        <Weather />
        </div>
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