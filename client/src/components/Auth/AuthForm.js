import { useState, useRef, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Axios from "axios";
import AuthContext from '../../store/auth-context';
import classes from './AuthForm.module.css';

const AuthForm = () => {
  const navigate = useNavigate();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const authCtx = useContext(AuthContext);

  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    setIsLoading(true);
    let url;
    if (isLogin) {
      url =
      'http://localhost:3001/login';
    } else {
      url =
      'http://localhost:3001/signup';
    }
    async function logIn(){
      const res = await Axios.post(url, 
      {email: enteredEmail,
      password: enteredPassword}
      )
    console.log(res.data.result);
    return (res)};
  
    logIn().then((res) => {
        setIsLoading(false);
        if (res) {
          return res.data;
        } else {
          return res.then((data) => {
            let errorMessage = 'Authentication failed!';
            // if (data && data.error && data.error.message) {
            //   errorMessage = data.error.message;
            // }

            throw new Error(errorMessage);
          });
        }
      })
      .then((res) => {
        const expirationTime = new Date(
          new Date().getTime() +　1000000
          //  + +res.expiresIn * 1000
        );
        console.log(res.userID)
        authCtx.login(
          res.accessToken,
          expirationTime.toISOString(),
          res.userID
          );
        console.log(res.accessToken)
        navigate("../", { replace: true })
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input type='email' id='email' required ref={emailInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input
            type='password'
            id='password'
            required
            ref={passwordInputRef}
          />
        </div>
        <div className={classes.actions}>
          {!isLoading && (
            <button>{isLogin ? 'Login' : 'Create Account'}</button>
          )}
          {isLoading && <p>Sending request...</p>}
          <button
            type='button'
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
