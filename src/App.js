import './App.module.css';
import { useContext } from 'react';
import AuthContext from './store/authContext';
import {Routes, Route, Navigate} from 'react-router-dom';
import Header from './Components/Header/Header';
import Footer from './Components/Footer/Footer';
import Auth from './Components/Auth/Auth';
import Home from './Components/Home/Home';
import Profile from './Components/Profile/Profile';
import Favorites from './Components/Favorites/Favorites';

const App = () => {
  const authCtx = useContext(AuthContext)
  return (
    <div className="App">
      <Header />
        <Routes>
          <Route index element={<Home/>} />
          <Route path='/auth' element={!authCtx.token ? <Auth/> : <Navigate to='/'/>}/>
          <Route path='/profile' element={authCtx ? <Profile/> : <Navigate to='/auth'/>}/>
          <Route path='/favorites' element={authCtx ? <Favorites/> : <Navigate to='/auth'/>}/>
          
        </Routes>
      <Footer />
    </div>
  );
}

export default App;
