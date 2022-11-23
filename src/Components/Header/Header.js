import { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import AuthContext from "../../store/authContext";
import styles from './Header.module.css';
import HamburgerDrawer from "../HamburgerDrawer.js/HamburgerDrawer";

const Header = ({setCategory, outerContainerId, pageWrapId}) => {
  const authCtx = useContext(AuthContext)
  const nav = useNavigate()
  const styleActiveLink = ({ isActive }) => {
      return {
          color: isActive ? '#f57145' : ''
      }
  }
  return ( 
    <div className={styles.nav}>
      <nav>
        {
          authCtx.token ? (
            <ul className='main-nav'>
              <div className={styles.menu}>
                  <HamburgerDrawer setCategory={setCategory} outerContainerId={'outer-container'} pageWrapId={'page-wrap'}/>
              </div>
            <li className={styles.newsicon}>
               <NavLink style={styleActiveLink} to='profile'>Daily News</NavLink>
            </li>
            <li>
               <button className='logout-btn' onClick={() => {
                authCtx.logout()
                nav('/')
                }}>Logout</button>
            </li>
            <li>
              <img
              alt='profile pic'
              src={
                authCtx.profilepicUrl
                  ? authCtx.profilepicUrl
                  : null
              }
              className={styles.newsImage}
              />
            </li>
            </ul>
          ) : (
            <ul className='main-nav'>
            <li>
               <NavLink style={styleActiveLink} to='/'>Daily</NavLink>
           </li>        
           <li>
              <NavLink style={styleActiveLink} to='auth'>Login or Register</NavLink>
           </li>
               </ul>
          )
        }
      </nav>

    
  </div> )
};

export default Header;