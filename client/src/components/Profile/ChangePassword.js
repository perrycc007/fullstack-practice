import { useRef, useContext } from 'react';
import { useNavigate  } from 'react-router-dom';
import Axios from "axios";
import AuthContext from '../../store/auth-context';
import classes from './ChangePassword.module.css';

const ChangePassword = () => {
  const navigate  = useNavigate ();

  const newPasswordInputRef = useRef();
  const newEmailInputRef = useRef();
  const authCtx = useContext(AuthContext);

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredNewPassword = newPasswordInputRef.current.value;
    const enteredEmail = newEmailInputRef.current.value;
    // add validation

    async function update(){
      const response = await Axios.patch('http://localhost:3001/changepassword', 
      { token: authCtx.token,
        email: enteredEmail,
        password: enteredNewPassword})};
      update( ).then(res => {
      // assumption: Always succeeds!
      navigate("../", { replace: true })
    });
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor='new-password'>New Password</label>
        <input type='email' ref={newEmailInputRef} />
        <input type='password' id='new-password' minLength="7" ref={newPasswordInputRef} />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
};

export default ChangePassword;
