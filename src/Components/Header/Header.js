import { useContext } from "react";
import { NavLink } from "react-router-dom";
import AuthContext from "../../store/authContext";
import styles from './Header.module.css';
import HamburgerDrawer from "../HamburgerDrawer.js/HamburgerDrawer";

const Header = ({setCategory, outerContainerId, pageWrapId}) => {
  const authCtx = useContext(AuthContext)
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
            <li>
               <NavLink style={styleActiveLink} to='profile'>Daily News</NavLink>
            </li>
            <li>
               <button className='logout-btn' onClick={() => authCtx.logout()}>Logout</button>
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