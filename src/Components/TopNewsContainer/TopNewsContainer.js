import styles from './TopNewsContainer.module.css'
import ArticleCard from '../ArticleCard/ArticleCard';

const TopNewsContainer = ({newsArray, loadMore, setLoadMore, newsResults}) => {
  return (
    <div className={styles.wrapper}>
      {newsArray.map((newsItem) => {
        return <ArticleCard newsItem={newsItem} key={newsItem.title}/>
      })}
      {loadMore <= newsResults && (
          <>
            <hr />
            <button
              className={styles.loadMore}
              onClick={() => setLoadMore(loadMore + 20)}
            >
              Load More
            </button>
          </>
        )}
    </div>
  )
}
export default TopNewsContainer;