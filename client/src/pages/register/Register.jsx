import { useRef } from 'react';
import './register.css'
import axios from 'axios';
import { useNavigate } from 'react-router'

export default function Register() {

  const username = useRef();
  const email = useRef();
  const password = useRef();
  const passwordAgain = useRef();
  const history = useNavigate();

  const handleClick = async (e) => {
    e.preventDefault();

    if (passwordAgain.current.value !== password.current.value){
      password.current.setCustomValidity( "Passwords Don't Match" );
    } else {
      const user = {
        username : username.current.value,
        email: email.current.value,
        password: password.current.value,
      };
      try{
        await axios.post("/auth/register", user);
        history("/login");
      } catch (err) {
        console.log(err);
      }
    }
  }

  return (
    <div className='login'>
      <div className="loginWrapper">
        <div className="loginLeft">
            <h3 className="loginLogo">Lamasocial</h3>
            <span className="loginDesc">
                Connect with friends and the world around you with Lamasocial😉
            </span>
        </div>
        <div className="loginRight">
            <form className="loginBox" onSubmit={handleClick}>
                <input placeholder='Username' className="loginInput" required ref={username}/>

                <input placeholder='Email' className="loginInput" ref={email} required type="email"/>
                
                <input placeholder='Password (must be at least 6 digits)' className="loginInput" required ref={password} type='password' minLength="6"/>
                
                <input placeholder='Confirm Password' className="loginInput" required ref={passwordAgain} type='password'/>
                
                <button className="loginButton" type='submit'>Sign up</button>
                
                <span className="loginForgot">Forgot Password ?</span>
                
                <button className="loginRegisterButton">
                    Log into Account
                </button>
            </form>
        </div>
      </div>
    </div>
  )
}
