import styles from './ArticleCard.module.css';
import { NavLink , useNavigate} from 'react-router-dom';
import { useContext } from 'react';
import axios from 'axios';
import AuthContext from '../../store/authContext';


const ArticleCard = ({newsItem}) => {
  console.log(newsItem)

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
          userId 
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
            <NavLink to={newsItem.url} target="__blank" className="source">
            </NavLink>
          </span>
        </div>
      </div>
      <button>Add to Favorites</button>
      </form>
    </div>
  )
}

export default ArticleCard;