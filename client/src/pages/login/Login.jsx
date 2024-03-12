import './login.css';
import { useContext, useRef } from 'react';
import { loginCall } from '../../apiCalls';
import  { AuthContext } from '../../context/AuthContext';
import ReactLoading from 'react-loading'
// import  CircularProgress from '@mui/material/CircularProgress';
// import Box from '@mui/material/Box';

export default function Login() {

  const email = useRef();
  const password = useRef();
  const { user, isFetching, error, dispatch } = useContext(AuthContext);

  const handleClick = (e) => {
    //prevents the page from refreshing everytime we log in
    e.preventDefault(); 
    loginCall({ email:email.current.value, password:password.current.value }, dispatch);
  };

  console.log(user);
  return (
    <div className='login'>
      <div className="loginWrapper">
        <div className="loginLeft">
            <h3 className="loginLogo">Lamasocial</h3>
            <span className="loginDesc">
                Connect with friends and the world around you with Lamasocial😉
            </span>
        </div>
        <div className="loginRight" onSubmit={handleClick}>
            <form className="loginBox">
                <input placeholder='Email' type='email' className="loginInput" ref={email} required/>
                <input placeholder='Password' type='password' className="loginInput" ref={password} minLength="6" required/>
                <button className="loginButton">
                  { isFetching 
                  ? // <Box sx={{ display: 'flex',  }}>
                      // <CircularProgress color="success"/>
                    // </Box>
                    <ReactLoading type={'spin'} color={'#fff'} height={20} width={20} className='loader' />
                  : "Log In" }
                </button>
                <span className="loginForgot">Forgot Password ?</span>
                <button className="loginRegisterButton">
                    Create a New Account
                </button>
            </form>
        </div>
      </div>
    </div>
  )
}
