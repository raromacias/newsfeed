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
    }, [userId, token])

    useEffect(() => {
      getCurrentUserArticles()
    },[getCurrentUserArticles])

    const deleteArticle = id => {
      axios.delete(`http://localhost:4545/favorites/${id}`, {
          headers: {
              authorization: token
          }
      })
          .then(() => {
              getCurrentUserArticles()
          })
          .catch(err => {
              console.log(err)
          })
  }

    
  return articles.length >= 1 ? (
    <div className={styles.favoriteswrapper}>
      {articles.map(article => {
        return (
          <div className={styles.newswrapper}>
              <div key={article.id} className= {styles.articlecard}>
              <a href={article.url} target="__blank">
                  <img src={article.image} alt={article.title} className={styles.faveImage}/>
                  </a>
                   <h2>{article.title}</h2>
                  <h4>{new Date(article.date).toLocaleDateString()}</h4>
                      <p>{article.description}</p>
              {
                userId === article.userId && 
                <div>
                   <button className={styles.formbtn} style={{marginLeft: 10}} onClick={() => deleteArticle(article.id)}>
                            Remove from Favorites
                        </button>
                </div>
              }
          </div>
          </div>
            )
           })}
      
    </div>
  ) : (
    <div><h1>There are no favorites yet!</h1></div>
  )
}

export default Favorites;