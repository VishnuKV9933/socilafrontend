import React from 'react'
import {HiUsers} from 'react-icons/hi'
import {MdLocalPostOffice} from 'react-icons/md'
import { NavLink ,useNavigate} from 'react-router-dom'
import { baseUrl } from '../Utility/utility';
import { useCookies } from 'react-cookie';

function SideBar() {
  const navigate=useNavigate()
  const [cookies, removeCookie] = useCookies([]);
  const logout = () => {
    removeCookie("adminjwt");
    navigate("/adminlogin");
  };
  return (
    <div className='flex flex-col items-center justify-center gap-6  p-1' >
 <div

 className='font-serif	 flex flex-col items-center justify-center bg-blue-400 w-full p-1 rounded-md text-white text-3xl gap-2'>
<div>World Face</div>

 <div className='text-xl'>Admin</div>
 </div>


 <NavLink to='/admindashboard' className='font-serif	 flex justify-center bg-blue-800 w-5/6 p-4 rounded-md text-white text-3xl gap-2' >
    <HiUsers/>
    <div>
    DASHBOARD

    </div>
  </NavLink>

<NavLink to='/adminhome' className='font-serif	 flex justify-center bg-blue-800 w-5/6 p-4 rounded-md text-white text-3xl gap-2' >
    <HiUsers/>
    <div>
    USERS

    </div>
  </NavLink>


  

    <NavLink to='/adminpostmangement' className='font-serif	 flex justify-center bg-blue-800 w-5/6 p-4 rounded-md text-white text-3xl gap-2' >
    <MdLocalPostOffice/>
    <div>
    POSTS

    </div>
    </NavLink>

  <div onClick={()=>{logout()}}  className='font-serif cursor-pointer	 flex justify-center bg-blue-800 w-5/6 p-4 rounded-md text-white text-3xl gap-2'>Log Out</div>

    </div>
  )
}

export default SideBar
