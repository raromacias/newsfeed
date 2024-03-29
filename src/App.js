import styles from './App.module.css';
import axios from 'axios';

import { useContext, useState, useEffect } from 'react';
import AuthContext from './store/authContext';
import {Routes, Route, Navigate} from 'react-router-dom';
import Header from './Components/Header/Header';
import Footer from './Components/Footer/Footer';
import Auth from './Components/Auth/Auth';
import Home from './Components/Home/Home';
import Profile from './Components/Profile/Profile';
import Favorites from './Components/Favorites/Favorites';

const App = () => {
  const [newsArray, setNewsArray] = useState([])
  const [newsResults, setNewsResults] = useState();
  const [loadMore, setLoadMore] = useState(20);
  const [category, setCategory] = useState('general')


  const getData = async () => {
    const options = {
      method: 'GET',
      url: 'https://google-news-api1.p.rapidapi.com/search',
      params: {
        language: 'EN'
      },
      headers: {
        'X-RapidAPI-Key': `${process.env.REACT_APP_API_KEY}`,
        'X-RapidAPI-Host': 'google-news-api1.p.rapidapi.com'
      }
    };
    
    try {
      const response = await axios.request(options);
      console.log(response.data.news.news);
      setNewsArray(response.data.news.news);
      setNewsResults(response.data.news.total);
    } catch (error) {
      console.error(error);
    }

    // try {
      
    //    await axios.get(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${process.env.REACT_APP_API_KEY}&pageSize=${loadMore}&category=${category}`)
    //   .then((res) => {
    //     console.log(res.data);
    //     setNewsArray(res.data.articles);
    //     setNewsResults(res.data.totalResults)
    //   });
    // } catch (error) {
    //   console.log(error)
    // }
};
useEffect(() => {
getData();
},[newsResults, loadMore, category]);



  const authCtx = useContext(AuthContext)
  return (
    <div className={styles.app} id='outer-container'>
      <div id='page-wrap'>
      <Header setCategory={setCategory}/>
        <Routes>
          <Route 
            index 
            element={<Home 
                        newsResults={newsResults}
                        newsArray={newsArray}
                        loadMore={loadMore}
                        setLoadMore={setLoadMore}/>
                        
                      } 
            />
          <Route path='/auth' element={!authCtx.token ? <Auth/> : <Navigate to='/'/>}/>
          <Route path='/profile' element={authCtx ? <Profile
           newsResults={newsResults}
           newsArray={newsArray}
           loadMore={loadMore}
           setLoadMore={setLoadMore}/> : <Navigate to='/auth'/>}/>
          <Route path='/favorites' element={authCtx ? <Favorites/> : <Navigate to='/auth'/>}/>
          
        </Routes>
        </div>
      <Footer />
    </div>
  );
}

export default App;
