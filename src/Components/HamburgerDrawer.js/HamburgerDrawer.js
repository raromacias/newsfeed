import "./HamburgerDrawer.css";
import {slide as Menu} from 'react-burger-menu';
import categories from "../../data/category";

const HamburgerDrawer = ({setCategory, outerContainerId, pageWrapId}) => {

  return (
    
    <Menu>
      <a href="/favorites">Favorites</a>
      <ul>
        {categories.map((text, index) => (
          <li
          style={{height: 40, borderRadius: 3}}
          button="true"
          onClick={() => setCategory(text)}
          key={text}
          >
            <p>{text}</p>
          </li>
        ))}
      </ul>
    </Menu>
    
    )
}
export default HamburgerDrawer;