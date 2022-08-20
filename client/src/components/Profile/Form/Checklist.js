import React from 'react'
import {useRef} from 'react';
import Axios from 'axios';

const Checklist = () => {
    const inputRef=useRef('')

    const submitHandler =(e) =>{
        e.preventDefault();
        const enteredValue = inputRef.current.value
        console.log(enteredValue)
        Axios.post('http://localhost:3001/create', {task: enteredValue
    }).then(() => {
        console.log('success');
    })
    }
    return(
        <div>
            <form onSubmit={submitHandler}>
                <input ref={inputRef}/>
                <button type="submit">submit</button>
            </form>
        </div>
    )
};

export default Checklist;