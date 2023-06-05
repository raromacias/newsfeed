import { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import AuthContext from "../../store/authContext";
import styles from './Header.module.css';

import HamburgerDrawer from "../HamburgerDrawer.js/HamburgerDrawer";

const Header = ({setCategory}) => {
  const authCtx = useContext(AuthContext)
  const nav = useNavigate()
  const styleActiveLink = ({ isActive }) => {
      return {
          color: isActive ? '#f57145' : ''
      }
  }
  return ( 
    
      <header className={styles.nav}>
        {
          authCtx.token ? (
            <div className={styles.container}>
              <div className={styles.leftcontainer}>
              <div className={styles.menu}>
                  <HamburgerDrawer setCategory={setCategory} outerContainerId={'outer-container'} pageWrapId={'page-wrap'}/>
              </div>
            <div className={styles.news}>
               <NavLink  classname={styles.daily} style={styleActiveLink} to='profile'>Beach City News</NavLink>
            </div>
            </div>
            <div className={styles.rightcontainer}>
            <div>
               <button className={styles.logoutbtn} onClick={() => {
                authCtx.logout()
                nav('/')
                }}>Logout</button>
            </div>
            <div>
              <img
              alt='profile pic'
              src={
                authCtx.profilepicUrl
                  ? authCtx.profilepicUrl
                  : null
              }
              className={styles.newsImage}
              />
            </div>
            </div>
             </div>
          ) : (
            <div className={styles.container}>
            
            <div>
               <NavLink  style={styleActiveLink} to='/'> Beach City News </NavLink>
           </div>        
           <div>
              <NavLink style={styleActiveLink} to='auth'>Login or Register</NavLink>
           </div>
              
               </div>
          )
        }
      </header>

    
   )
};

export default Header;