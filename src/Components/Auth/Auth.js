import {useState, useContext} from 'react';
import axios from 'axios';
import AuthContext from '../../store/authContext';
import styles from './Auth.module.css'


const Auth = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [location, setLocation] = useState('')
  const [register, setRegister] = useState(true)

  const authCtx = useContext(AuthContext)
 
  const handleAuth = e => {
    e.preventDefault()

    const body = {
      location,
      password,
      username
    }
    axios.post(`${register ? `/register` : `/login`}`, body)
        .then(res=> {
              console.log(res.data)
              console.log(authCtx)
              const {token, exp, userId, location, username} = res.data
              authCtx.login(token, exp, location, username, userId)
            })
        .catch(err=> {
          console.log(err)
          setUsername('');
          setPassword('');
          setLocation('')

        })
      }  
      
  return (
    <main>
           <h1>the new news {register ? 'Register' : 'Login'} below!</h1>
           {register ? (
            <div className={styles.authform}>
           <form onSubmit={e => handleAuth(e)}>
               <input
                   className={styles.forminput}
                   placeholder='Create a username'
                   value = {username}
                   onChange={e => setUsername(e.target.value)}
                   />
               <input
                   className={styles.forminput}
                   placeholder='Enter a password'
                   value={password}
                   onChange={e => setPassword(e.target.value)}
                   />
                <input
                   className={styles.forminput}
                   placeholder='Enter a location'
                   value={location}
                   onChange={e => setLocation(e.target.value)}
                   />
               <button className={styles.formbtn}>
                  Submit
               </button>
           </form>
           </div>
           ) : (
            <div className={styles.authform}>
           <form  onSubmit={e => handleAuth(e)}>
               <input
                   className={styles.forminput}
                   placeholder='Create a username'
                   value = {username}
                   onChange={e => setUsername(e.target.value)}/>
               <input
                   className={styles.forminput}
                   placeholder='Enter a password'
                   value={password}
                   onChange={e => setPassword(e.target.value) }/>
               <button className={styles.formbtn}>
                   Submit
               </button>
           </form>
           </div>
                )
              }
          <button className={styles.formbtn} onClick={() => setRegister(!register)}>{register ? "Login" : "Register"}</button>
       </main>
  )
}

export default Auth