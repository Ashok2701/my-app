import React from 'react'
import { SiShopware } from 'react-icons/si';
import Button from './Button';
import { MdOutlineCancel } from 'react-icons/md';
import { Link, NavLink } from 'react-router-dom';
import { links } from '../data/dummy';

import { useStateContext } from '../contexts/ContextProvider';

const SideBar = () => {

  const activeLink = 'flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg  text-white  text-md m-2';
  const normalLink = 'flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-md text-gray-700 dark:text-gray-200 dark:hover:text-black hover:bg-light-gray m-2';

   const {currentColor, activeMenu, setActiveMenu, screenSize }=  useStateContext();


   console.log("data in sidebar", activeMenu)

  const closeMenubar = () => {
      console.log("data insde function", activeMenu)
      if (activeMenu !== undefined && screenSize <= 900) {
        setActiveMenu(false);
      }
      console.log("data insde function after", activeMenu)

   }


   



  return (
    <div className='ml-3 h-screen pb-10 
     md:overflow-hidden overflow-auto
     md:hover:overflow-auto'>
      {activeMenu && (
        <>
       <div className='flex justify-between items-center'>
       <Link to="/" onClick={() => setActiveMenu(false)} className='flex gap-3 items-center ml-3 mt-4 text-xl font-extrabold tracking-tight text-slate-900 dark:text-white'>
       <SiShopware /> <span>Shoppy</span>
       </Link>
       <div className=' mt-4 p-3'>
         <button type='button'
         
         onClick={() => setActiveMenu(!activeMenu)}
         style={{ color: currentColor }}
          className='hover:bg-light-gray block text-xl rounded-full'>
           <MdOutlineCancel />
         </button>
       </div>
       </div>
       <div className='mt-10'>
           {links.map((item) => (
            <div key={item.title} className='text-gray-400 m-3 mt-4 uppercase'>
            {item.title} 
               
               {item.links && item.links.map((link) => (
                <NavLink onClick={() => closeMenubar()} to={`/${link.name}`} key={link.name} style={({ isActive }) => ({
                      backgroundColor: isActive ? currentColor : '',
                    })} className= {({isActive}) => 
                isActive ? activeLink : normalLink
                }>
                  {link.icon} <span className='capitalize'>{link.name}</span>
                </NavLink>
               ))}
            
            </div>
           ))}
       </div>
     </>
      )}      
    </div>
  )
}

export default SideBar
