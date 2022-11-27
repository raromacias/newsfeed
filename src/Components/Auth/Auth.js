import {useState, useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import AuthContext from '../../store/authContext';
import styles from './Auth.module.css'


const Auth = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [location, setLocation] = useState('')
  const [profilepicUrl, setprofilepicUrl] = useState('')
  const [register, setRegister] = useState(true)

  const authCtx = useContext(AuthContext)
  
  const nav = useNavigate()
  const handleAuth = e => {
    e.preventDefault()

    const body = {
      username,
      password,
      location,
      profilepicUrl
    }
    axios.post(`${register ? `/register` : `/login`}`, body)
        .then(res=> {
              console.log(res.data)
              console.log(authCtx)
              const {token, exp, userId, location, username, profilepicUrl} = res.data
              authCtx.login(token, exp, location, username, userId, profilepicUrl)
              nav('/profile')
            })
        .catch(err=> {
          console.log(err)
          setUsername('');
          setPassword('');
          setLocation('');
          setprofilepicUrl('')

        })
      }  
      
  return (
    <div className={styles.logincontainer}>
           <h1 className={styles.headline}>Enter your details: {register ? 'Register' : 'Login'} below!</h1>
           {register ? (
            <div className={styles.authform}>
           <form onSubmit={e => handleAuth(e)}>
            <div className={styles.inputdiv}>
               <input
                   className={styles.forminput}
                   placeholder='Create a username'
                   value = {username}
                   onChange={e => setUsername(e.target.value)}
                   />
            </div>
            <div className={styles.inputdiv}>
               <input
                   className={styles.forminput}
                   placeholder='Enter a password'
                   value={password}
                   onChange={e => setPassword(e.target.value)}
                   />
            </div>
            <div className={styles.inputdiv}>
                <input
                   className={styles.forminput}
                   placeholder='Enter a location'
                   value={location}
                   onChange={e => setLocation(e.target.value)}
                   />
            </div>
            <div className={styles.inputdiv}>
                   <input
                   className={styles.forminput}
                   placeholder='Enter a profile pic url'
                   value={profilepicUrl}
                   onChange={e => setprofilepicUrl(e.target.value)}
                   />
            </div>
               <button className={styles.formbtn}>
                  Submit
               </button>
           </form>
           </div>
           ) : (
            <div className={styles.authform}>
           <form  onSubmit={e => handleAuth(e)}>
            <div className={styles.inputdiv}>
               <input
                   className={styles.forminput}
                   placeholder='Create a username'
                   value = {username}
                   onChange={e => setUsername(e.target.value)}/>
            </div>
            <div className={styles.inputdiv}>
               <input
                   className={styles.forminput}
                   placeholder='Enter a password'
                   value={password}
                   onChange={e => setPassword(e.target.value) }/>
            </div>
               <button className={styles.formbtn}>
                   Submit
               </button>
           </form>
           </div>
                )
              }
          <button className={styles.formbtn} onClick={() => setRegister(!register)}>{register ? "Login" : "Register"}</button>
       </div>
  )
}

export default Auth