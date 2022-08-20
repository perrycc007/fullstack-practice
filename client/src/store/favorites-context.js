import { createContext, useState } from 'react';

const FavoritesContext = createContext({
  favorites: [],
  totalFavorites: 0,
  addFavorite: (favoriteCase) => {},
  removeFavorite: (CaseId) => {},
  itemIsFavorite: (CaseId) => {}
});

export function FavoritesContextProvider(props) {
  const [userFavorites, setUserFavorites] = useState([]);

  function addFavoriteHandler(favoriteCase) {
    setUserFavorites((prevUserFavorites) => {
      return prevUserFavorites.concat(favoriteCase);
    });
  }

  function removeFavoriteHandler(CaseId) {
    setUserFavorites(prevUserFavorites => {
      return prevUserFavorites.filter(caseItem => caseItem.id !== CaseId);
    });
  }

  function itemIsFavoriteHandler(CaseId) {
    return userFavorites.some(caseItem => caseItem.id === CaseId);
  }

  const context = {
    favorites: userFavorites,
    totalFavorites: userFavorites.length,
    addFavorite: addFavoriteHandler,
    removeFavorite: removeFavoriteHandler,
    itemIsFavorite: itemIsFavoriteHandler
  };

  return (
    <FavoritesContext.Provider value={context}>
      {props.children}
    </FavoritesContext.Provider>
  );
}

export default FavoritesContext;
