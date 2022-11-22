import AuthContext from "../../store/authContext";
import { useState, useEffect, useContext, useCallback } from "react";
import styles from './Favorites.module.css';
import axios from "axios";

const Favorites = () => {

  const {userId, token} = useContext(AuthContext)
  
    const [articles, setArticles] = useState([])

    const getCurrentUserArticles = useCallback(() => {
        axios.get(`http://localhost:4545/favorites/${userId}`, {
          headers: {
              authorization: token
          }
      })
        .then(res => setArticles(res.data)) 
        .catch(err => console.log(err))
    }, [userId])

    useEffect(() => {
      getCurrentUserArticles()
    },[getCurrentUserArticles])

    
  return articles.length >= 1 ? (
    <div className={styles.favoritescard}>
      {articles.map(article => {
        return (
              <div key={article.id} className='post-card'>
                <img src={article.urlToImage} alt={article.title} />
              <h2>{article.title}</h2>
              <h4>{article.publishedAt}</h4>
              <p>{article.description}</p>
          </div>
            )
           })}
      
    </div>
  ) : (
    <div><h1>There are no favorites yet!</h1></div>
  )
}

export default Favorites;