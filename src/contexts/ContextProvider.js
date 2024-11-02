import React, { createContext, useContext, useState, useEffect } from 'react';

const StateContext = createContext();

const initialState = {
  chat: false,
  cart: false,
  userProfile: false,
  notification: false,
};

export const ContextProvider = ({ children }) => {
  const [screenSize, setScreenSize] = useState(undefined);
  const [currentColor, setCurrentColor] = useState('#03C9D7');
  const [currentMode, setCurrentMode] = useState('Dark');
  const [themeSettings, setThemeSettings] = useState(false);
  const [activeMenu, setActiveMenu] = useState(true);
  const [isClicked, setIsClicked] = useState(initialState);
   // Authentication State
   const [isAuthenticated, setIsAuthenticated] = useState(false);
   const [currentUser, setCurrentUser] = useState(null);


   useEffect(() => {
    const savedColor = localStorage.getItem('colorMode');
    const savedMode = localStorage.getItem('themeMode');
    const authStatus = localStorage.getItem('isAuthenticated');

    if (savedColor) setCurrentColor(savedColor);
    if (savedMode) setCurrentMode(savedMode);
    if (authStatus === 'true') setIsAuthenticated(true);
  }, []);


  const setMode = (e) => {
    setCurrentMode(e.target.value);
    localStorage.setItem('themeMode', e.target.value);
  };

  const setColor = (color) => {
    setCurrentColor(color);
    localStorage.setItem('colorMode', color);
  };

  const handleClick = (clicked) => setIsClicked({ ...initialState, [clicked]: true });

 // Login function using fetch
 const login = async (username, password) => {
   console.log("data username",username)

  try {
    const response = await fetch('http://tmsx3.tema-systems.com:8050/api/fms/user/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
      const data = await response.json();
      localStorage.setItem('isAuthenticated', 'true');
      setIsAuthenticated(true);
      setCurrentUser(data.xusrname); // Save user details
      return true;
    } else {
      console.error('Login failed: ', response.statusText);
      return false;
    }
  } catch (error) {
    console.error('Login failed: ', error);
  }
};

// Logout function
const logout = () => {
  localStorage.removeItem('isAuthenticated');
  setIsAuthenticated(false);
  setCurrentUser(null);
};


  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <StateContext.Provider value={{ currentColor, currentMode, activeMenu, screenSize, setScreenSize, handleClick, isClicked, initialState, setIsClicked, setActiveMenu, setCurrentColor, setCurrentMode, setMode, setColor, themeSettings, setThemeSettings, isAuthenticated,
      login,
      logout,
      currentUser }}>
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);