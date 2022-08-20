import { useState, useRef, useContext, useEffect } from 'react';
import Axios from "axios";
import AuthContext from '../store/auth-context';
import FavoritesContext from '../store/favorites-context';
import CaseList from '../components/Case/CaseList';

function FavoritesPage() {
  const favoritesCtx = useContext(FavoritesContext);
  const authCtx = useContext(AuthContext);
  const [loadedCases, setLoadedCases] = useState([]);
  const [totalCases, setTotalCases] = useState();
  const [skipData, setSkipData] = useState(0);
  const limit = 2;
  useEffect(() => {
    async function getFavourite(){
      const res = await Axios.get('http://localhost:3001/favourite', 
      { userid: authCtx.userID }
    )
      return res.data
    }
    const url = 'http://localhost:3001/case' + `?limit=${limit}` + `&skip=${skipData|0}`
    async function getFavouriteCase(){
        const request = getFavourite()
        const res = await Axios.get(url, 
        { caseid : request.data.caseid }
      )
    // console.log(res);
    return (res)};
  
    getFavouriteCase().then((res) => {
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


  let content;

  if (favoritesCtx.totalFavorites === 0) {
    content = <p>You got no favorites yet. Start adding some?</p>;
  } else {
    content = <CaseList cases={favoritesCtx.favorites} count={favoritesCtx.totalFavorites} passSkipData={setSkipData}/>;
  }

  return (
    <section>
      <h1>My Favorites</h1>
      {content}
    </section>
  );
}

export default FavoritesPage;
