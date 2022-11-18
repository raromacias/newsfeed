import './App.module.css';
import {Routes, Route} from 'react-router-dom';
import Header from './Components/Header/Header';
import Footer from './Components/Footer/Footer';
import Auth from './Components/Auth/Auth';
import Home from './Components/Home/Home';
import Profile from './Components/Profile/Profile';
import Favorites from './Components/Favorites/Favorites';

function App() {
  return (
    <div className="App">
      <Header />
        <Routes>
          <Route index element={<Home/>} />
          <Route path='/profile' element={<Profile/>}/>
          <Route path='/favorites' element={<Favorites/>}/>
          <Route path='/auth' element={<Auth/>}/>
        </Routes>
      <Footer />
    </div>
  );
}

export default App;
