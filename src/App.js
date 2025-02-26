import React , { useEffect} from 'react'
import './App.css'
import { FiSettings } from 'react-icons/fi';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Dashboard from './pages/Dashboard/Dashboard';
import { Sidebar , Navbar, ThemeSettings } from './components';
import { useStateContext } from './contexts/ContextProvider';
import Login from './pages/Login/Login';

const App = () => {
  
  const { setCurrentColor,isAuthenticated,logout, login, setCurrentMode, currentMode, activeMenu, currentColor, themeSettings, setThemeSettings } = useStateContext();



  useEffect(() => {

    const currentThemeColor = localStorage.getItem('colorMode');
    const currentThemeMode = localStorage.getItem('themeMode');
    if (currentThemeColor && currentThemeMode) {
      setCurrentColor(currentThemeColor);
      setCurrentMode(currentThemeMode);
    }
  }, []);

 

  return (
    <div className={currentMode === 'Dark' ? 'dark' : ''}>
      
      <BrowserRouter>
         {!isAuthenticated ? (
          <Routes>
            <Route path="*" element={<Login />} />
          </Routes>
        ) : (
        <div className='flex relative dark:bg-main-dark-bg'>
         
          {activeMenu ?
            (
              <div className='w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white'>
               <Sidebar />
               </div>
            ) :
            (
              <div className='w-0 dark:bg-secondary-dark-bg'>
              
               </div>
            )
          }
          <div
            className={
              activeMenu ?
                'dark:bg-main-dark-bg bg-main-bg min-h-screen md:ml-72 w-full'
                :
                'bg-main-bg dark:bg-main-dark-bg w-full min-h-screen flex-2'

            }>
            <div className='fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full'>
              <Navbar />
            </div>
          

          
          <div>
          {themeSettings && (<ThemeSettings />)}
            <Routes>
              
            <Route path='/' element={ <Dashboard />} />
            <Route path='/Dashboard' element={< Dashboard />} />

            </Routes>
          </div>
       </div>
       </div>
        )}
      </BrowserRouter>
      
    </div>
  )
}

export default App

