import { useContext } from 'react';

import Card from '../Layout/Card';
import classes from './CaseItem.module.css';
import FavoritesContext from '../../store/favorites-context';
import AuthContext from '../../store/auth-context';
import Axios from "axios";



function CaseItem(props) {
  const favoritesCtx = useContext(FavoritesContext);
  const authCtx = useContext(AuthContext);
  const itemIsFavorite = favoritesCtx.itemIsFavorite(props.id);
  async function removeFromFavorite(){
    const res = await Axios.delete('http://localhost:3001/favourite', 
    {caseid: props.id,
    userid: authCtx.userID}
  )
    console.log(res.data.result);
    return (res)}



    async function addToFavorite(){
      const res = await Axios.post('http://localhost:3001/favourite', 
      {caseid: props.id,
      userid: authCtx.userID}
    )
      console.log(res.data.result);
      return (res)}

  function toggleFavoriteStatusHandler() {
    if (itemIsFavorite) {
      favoritesCtx.removeFavorite(props.id);
        removeFromFavorite();
    }
     else {
      favoritesCtx.addFavorite({
        id: props.id,
        title: props.title,
        description: props.content,
        
      });
        addToFavorite();
    }
  }

  return (
    <li className={classes.item}>
      <Card>
        <div className={classes.content}>
          <h3>{props.title}</h3>
          <p>{props.content}</p>
        </div>
        <div className={classes.actions}>
          <button onClick={toggleFavoriteStatusHandler}>
            {itemIsFavorite ? 'Remove from Favorites' : 'To Favorites'}
          </button>
        </div>
      </Card>
    </li>
  );
}

export default CaseItem;
