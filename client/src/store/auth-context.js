import React, { useState, useEffect, useCallback } from 'react';

let logoutTimer;

const AuthContext = React.createContext({
  token: '',
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {},
  userID: ''
});

const calculateRemainingTime = (expirationTime) => {
    const currentTime = new Date().getTime();
    const adjExpirationTime = new Date(expirationTime).getTime();
  
    const remainingDuration = adjExpirationTime - currentTime;
  
    return remainingDuration;
  };

  const retrieveStoredToken = () => {
    const storedToken = localStorage.getItem('accessToken');
    const storedExpirationDate = localStorage.getItem('expirationTime');
    const storedUserID = localStorage.getItem('userID');
  
    const remainingTime = calculateRemainingTime(storedExpirationDate);
  
    if (remainingTime <= 3600) {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('expirationTime');
      localStorage.removeItem('userID');
      return null;
    }
  
    return {
      token: storedToken,
      duration: remainingTime,
      userID: storedUserID
    };
  };


  export const AuthContextProvider = (props) => {
    const tokenData = retrieveStoredToken();
    let initialUserID;
    let initialToken;
    if (tokenData) {
      initialToken = tokenData.token;
      initialUserID = tokenData.userID;
    }
  
    const [token, setToken] = useState(initialToken);
    const [userID, setUserID] = useState(initialUserID);

    const userIsLoggedIn = !!token;

  
    const logoutHandler = useCallback(() => {
      setToken(null);
      setUserID(null);
      localStorage.removeItem('accessToken');
      localStorage.removeItem('expirationTime');
      localStorage.removeItem('userID');
  
      if (logoutTimer) {
        clearTimeout(logoutTimer);
      }
    }, []);

    const loginHandler = (token, expirationTime, userID) => {
        setToken(token);
        setUserID(userID);
        localStorage.setItem('accessToken', token);
        localStorage.setItem('expirationTime', expirationTime);
        localStorage.setItem('userID', userID);


        const remainingTime = calculateRemainingTime(expirationTime);
    
        logoutTimer = setTimeout(logoutHandler, remainingTime);
        
      };
    
      useEffect(() => {
        if (tokenData) {
          // console.log(tokenData.duration);
          logoutTimer = setTimeout(logoutHandler, tokenData.duration);
        }
      }, [tokenData, logoutHandler]);
    
      const contextValue = {
        token: token,
        isLoggedIn: userIsLoggedIn,
        login: loginHandler,
        logout: logoutHandler,
        userID: userID
      };
    
      return (
        <AuthContext.Provider value={contextValue}>
          {props.children}
        </AuthContext.Provider>
      );
    };
    
    export default AuthContext;