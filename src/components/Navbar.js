import React, { useEffect, useState} from 'react';
import { AiOutlineMenu } from 'react-icons/ai';
import { FiShoppingCart , FiSettings, FiUser } from 'react-icons/fi';
import { BsChatLeft } from 'react-icons/bs';
import { RiNotification3Line } from 'react-icons/ri';
import { MdKeyboardArrowDown } from 'react-icons/md';

import { useStateContext } from '../contexts/ContextProvider';

import { Cart , Chat ,  UserProfile, ThemeSettings  } from '.';

const Navbar = () => {

  const { currentColor, activeMenu, setActiveMenu,currentMode,logout, handleClick, isClicked, setScreenSize, screenSize, themeSettings, setThemeSettings, currentUser } = useStateContext();

  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);

    window.addEventListener('resize', handleResize);

    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  console.log("user ", currentUser)

  useEffect(() => {
    if (screenSize <= 900) {
      setActiveMenu(false);
    } else {
      setActiveMenu(true);
    }
  }, [screenSize]);

  const handleActiveMenu = () => setActiveMenu(!activeMenu);

  const NavButton = ({ title, customFunc, icon, color, dotColor }) => (
    <button
      type="button"
      onClick={customFunc}
      style={{ color }}
      className="relative text-xl rounded-full p-3 hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
    >
      {dotColor && (
        <span
          style={{ background: dotColor }}
          className="absolute inline-flex rounded-full h-2 w-2 right-2 top-2"
        />
      )}
      {icon}
    </button>
  );





  return (
    <div className={`
      flex justify-between items-center p-2 relative
      transition-all duration-300 ease-in-out
      ${currentMode === 'Dark' 
        ? 'bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white border-gray-700' 
        : 'bg-gradient-to-r from-gray-50 via-white to-gray-50 text-gray-800 border-gray-200'
      }
      border-b backdrop-blur-sm
    `}>   
        <div className="flex items-center">
          <NavButton 
          title="Menu"
          color={currentColor}
          icon={<AiOutlineMenu />} 
          customFunc={() => setActiveMenu((prevActiveMenu) => !prevActiveMenu )}


          />
        </div>  
      
        <div className="flex items-center gap-4">
        <div 
          style={{ 
            background: currentMode === 'Dark' 
              ? `${currentColor}20` 
              : `${currentColor}10`,
            color: currentColor
          }}
          className="px-4 py-2 rounded-lg font-semibold transition-all duration-300"
        >
          TMSDEVN
        </div>

        <NavButton
          title="Settings"
          color={currentColor}
          customFunc={() => setThemeSettings(true)}
          icon={<FiSettings className="animate-spin-slow" />}
        />

        <div className="relative">
          <div
            className={`
              flex items-center gap-2 cursor-pointer p-2 rounded-lg
              transition-colors duration-200
              ${currentMode === 'Dark' 
                ? 'hover:bg-white/10' 
                : 'hover:bg-black/5'
              }
            `}
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            <div 
              style={{ 
                background: currentMode === 'Dark' 
                  ? `${currentColor}20` 
                  : `${currentColor}15`,
                color: currentColor 
              }}
              className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300"
            >
              <FiUser />
            </div>
            <span className={`font-medium ${
              currentMode === 'Dark' ? 'text-gray-200' : 'text-gray-700'
            }`}>
              {currentUser}
            </span>
            <MdKeyboardArrowDown className={
              currentMode === 'Dark' ? 'text-gray-400' : 'text-gray-600'
            } />
          </div>

          {dropdownOpen && (
            <div className={`
              absolute right-0 mt-2 w-48 rounded-lg shadow-lg z-50
              transition-all duration-200
              ${currentMode === 'Dark'
                ? 'bg-gray-800 border border-gray-700'
                : 'bg-white border border-gray-200'
              }
            `}>
              <div 
                className={`
                  p-2 cursor-pointer
                  ${currentMode === 'Dark'
                    ? 'hover:bg-gray-700 text-gray-200'
                    : 'hover:bg-gray-100 text-gray-700'
                  }
                `}
                onClick={() => {
                  handleClick('userProfile');
                  setDropdownOpen(false);
                }}
              >
                Profile
              </div>
              <div 
                className={`
                  p-2 cursor-pointer
                  ${currentMode === 'Dark'
                    ? 'hover:bg-gray-700 text-gray-200'
                    : 'hover:bg-gray-100 text-gray-700'
                  }
                `}
                onClick={() => {
                  logout();
                  setDropdownOpen(false);
                }}
              >
                Logout
              </div>
            </div>
          )}
        </div>
      </div>

      {isClicked.cart && <Cart />}
      {isClicked.chat && <Chat />}
      {isClicked.userProfile && <UserProfile />}
    </div>
  );
};

export default Navbar;