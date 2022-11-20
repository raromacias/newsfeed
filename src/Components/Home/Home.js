import TopNewsContainer from "../TopNewsContainer/TopNewsContainer";
import styles from './Home.module.css'
const Home = ({newsArray, newsResults, loadMore, setLoadMore}) => {
  return (
    <div className={styles.newswrapper}>
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
export default Home;