import styles from './ArticleCard.module.css';


const ArticleCard = ({newsItem}) => {
  console.log(newsItem)

  const fulldate = new Date(newsItem.publishedAt);
  let date = fulldate.toString().split(" ");
  const hour = parseInt(date[4].substring(0, 2));
  const time = hour > 12 ? true : false;


  return (
    <div className={styles.artcontainer}>
      <img 
        alt={newsItem.title}
        src={
          newsItem.urlToImage
            ? newsItem.urlToImage
            : null
        }
        className={styles.newsImage}
        />
        <div className="newsText">
        <div>
          <span className="title">{newsItem.title}</span>
          <br />
            <a href={newsItem.url} target="__blank">
            </a>{" "}
            <span className="muted">
              {" "}
              {time
                ? `${hour - 12}:${date[4].substring(3, 5)} pm`
                : `${hour}:${date[4].substring(3, 5)} am`}{" "}
              on {date[2]} {date[1]} {date[3]}, {date[0]}
            </span>
          </div>
        <div className="lowerNewsText">
          <div className="description">{newsItem.description}</div>
          <span className="readmore">
            read more at{" "}
            <a href={newsItem.url} target="__blank" className="source">
            </a>
          </span>
        </div>
      </div>
    </div>
  )
}

export default ArticleCard;