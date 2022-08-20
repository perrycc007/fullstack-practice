import { useState, useRef, useContext, useEffect } from 'react';
import Axios from "axios";
import AuthContext from '../../store/auth-context';
import classes from './ApplyingForm.module.css';
import CaseList from './CaseList';

let limit = 2;
// GET /case?completed=true
// GET /case?limit=10&skip=20
// GET /case?sortBy=createdAt:desc
const Case = () => {
  const [loadedCases, setLoadedCases] = useState([]);
  const [totalCases, setTotalCases] = useState()
  const [skipData, setSkipData] = useState("");
  useEffect(() => {
    const url = 'http://localhost:3001/case' + `?limit=${limit}` + `&skip=${skipData|0}`
    console.log(url)
    async function getCase(){
        const res = await Axios.get(url, 
      )
    // console.log(res);
    return (res)};
  
    getCase().then((res) => {
        if (res) {
          return res;
        } else {
          return res.then((data) => {
            let errorMessage = 'Failed!';
            throw new Error(errorMessage);
          });
        }
      })
      .then((res) => {
        const cases = [];
        setTotalCases(res.data.count)
        for (const key in res.data.result) {
          const casesItem = {
            id: key,
            ...res.data.result[key]
          };
          cases.push(casesItem);
          setLoadedCases(cases);
      }

    })
      .catch((err) => {
        alert(err.message);
      });
    }, [skipData]);


  return (
    <div className={classes.auth}>
      <CaseList cases={loadedCases} count={totalCases} passSkipData={setSkipData}/>
    </div>
  );
};

export default Case;
