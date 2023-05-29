import styles from './ArticleCard.module.css';
import { useNavigate} from 'react-router-dom';
import { useContext } from 'react';
import axios from 'axios';
import AuthContext from '../../store/authContext';


const ArticleCard = ({newsItem}) => {

  const navigate = useNavigate()
  const {userId, token} = useContext(AuthContext)

  const fulldate = new Date(newsItem.publishedAt);
  let date = fulldate.toString().split(" ");
  const hour = parseInt(date[4].substring(0, 2));
  const time = hour > 12 ? true : false;

  const handleSubmit = e => {
    e.preventDefault()

    let body = {
          description: newsItem.description,
          urlToImage: newsItem.urlToImage,
          url: newsItem.url,
          publishedAt: newsItem.publishedAt,
          title: newsItem.title,
          userId: +userId 
    }
    axios.post(`http://localhost:4545/favorites/${userId}`, body, {
        headers: {
            authorization: token
        }
    })
        .then(() => {
            navigate('/favorites')
        })
        .catch(err => console.log(err))
}



  return (
    <div className={styles.artcontainer}>
      <form onSubmit={handleSubmit}>
      <a href={newsItem.link} target="__blank">
      <img 
        alt={newsItem.title}
        src={
          newsItem.props.image
            ? newsItem.props.image
            : null
            }
        className={styles.newsImage}
        />
        </a>
        <div className={styles.newsText}>
        <div>
          <span className={styles.title}>{newsItem.props.title}</span>
          {" "}
            <span className={styles.date}>
              {" "}
              {time
                ? `${hour - 12}:${date[4].substring(3, 5)} pm`
                : `${hour}:${date[4].substring(3, 5)} am`}{" "}
              on {date[2]} {date[1]} {date[3]}, {date[0]}
            </span>
          </div>
          <br />
        <div className={styles.lowerNewsText}>
          <div className="description">{newsItem.description}</div>
          
        </div>
      </div>
      {token ? <button className={styles.favebtn}>Add to Favorites</button> : null}
      </form>
    </div>
  )
}

export default ArticleCard;