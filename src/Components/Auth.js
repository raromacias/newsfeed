import {useState, useContext} from 'react';
import axios from 'axios';
import AuthContext from '../store/authContext';


const Auth = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [location, setLocation] = useState('')
  const [register, setRegister] = useState(true)

  const authCtx = useContext(AuthContext)

  const submitHandler = e => {
    e.preventDefault()
    setRegister(!register)

    const body = {
      username,
      password
    }

      if(register){
        axios.post(`/register`, body)
        .then((res)=> {
              console.log(`AFTER AUTH`, res.data)
              authCtx.login(res.data.token, res.data.exp, res.data.userId)})
        .catch(err=> {
          setUsername('');
          setPassword('');
        })
      } else {
        axios.post(`/login`, body)
        .then((res)=> {
              console.log('AFTER AUTH', res.data)
              authCtx.login(res.data.token, res.data.exp, res.data.userId)})
        .catch((err)=> {
          setUsername('');
          setPassword('');
        })

        }}
        const handleUserNameChange = (e) => {

          setUsername(e.target.value)
          console.log(username)
        }
        const handlePasswordChange = (e) => {

          setPassword(e.target.value)
          console.log(password)
        }
      
  return (
    <main>
           <h1>Welcome!</h1>
           <form className='form auth-form' onSubmit={submitHandler}>
               <input
                   className='form-input'
                   type='text'
                   placeholder='Create a username'
                   value = {username}
                   onChange={handleUserNameChange}/>
               <input
                   className='form-input'
                   type='password'
                   placeholder='Enter a password'
                   value={password}
                   onChange={handlePasswordChange}/>
               <button className='form-btn'>
                   {register ? 'Sign Up' : 'Login'}?
               </button>
           </form>
           <button className='form-btn' onClick={() => setRegister(!register)}>
            Need to {register ? 'Login' : 'Sign Up'}?</button>
       </main>
  )
}

export default Auth