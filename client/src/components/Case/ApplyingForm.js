import { useState, useRef, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Axios from "axios";
import AuthContext from '../../store/auth-context';
import classes from './ApplyingForm.module.css';

const ApplyingForm = () => {
  const navigate = useNavigate();
  const postInputRef = useRef();
  const titleInputRef = useRef();


  const authCtx = useContext(AuthContext);


  const [isLoading, setIsLoading] = useState(false);


  const submitHandler = (event) => {
    event.preventDefault();

    const title = titleInputRef.current.value;
    const postContent = postInputRef.current.value;
    const currentTime = new Date();
    setIsLoading(true);


    async function apply(){
        const res = await Axios.post('http://localhost:3001/apply', 
        {content: postContent,
        createdAt:currentTime,
        title:title,
        authorId: authCtx.userID}
      )
    console.log(res.data.result);
    return (res)};
  
    apply().then((res) => {
        setIsLoading(false);
        if (res) {
          return res.data;
        } else {
          return res.then((data) => {
            let errorMessage = 'Failed!';
            throw new Error(errorMessage);
          });
        }
      })
      .then((res) => {
        console.log("posted")
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    <section className={classes.auth}>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor='title'>Title</label>
          <input type='title' id='title' required ref={titleInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor='post'>Post</label>
          <input
            type='post'
            id='post'
            required
            ref={postInputRef}
          />
        </div>
        <div className={classes.actions}>
            <button>Post</button>
          {isLoading && <p>Sending request...</p>}
        </div>
      </form>
    </section>
  );
};

export default ApplyingForm;
