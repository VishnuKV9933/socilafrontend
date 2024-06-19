import React, { useEffect } from 'react'

import landingPageImage from '../Assets/socialimg.gif';
import { Link, useNavigate } from 'react-router-dom';
export default function LandingPage() {
    const navigate = useNavigate();

    const userId = localStorage.getItem("userId");
  
    useEffect(() => {
      if (!userId) {
      } else {
        navigate("/home");
      }
    }, []);
 
  return (
    <div className='flex flex-col sm:flex-row bg-gradient-to-b sm:bg-gradient-to-r from-white to-blue-500 h-screen'>
        <div className='ml-2 w-full sm:w-1/2 bg-bl ue-10 0 sm:h-screen p-2 sm:p-4 md:p-9 flex flex-col justify-center'>
               <h1  className='mt-5 font-serif italic font-bold  text-blue-900 text-xl sm:text-2xl md:text-4xl'>Welcome to New World!</h1>
               <h3 className='font-serif italic font-bold text-red-400 text-xl sm:text-2xl md:text-4xl'>Connecting You to What Matters Most</h3>
               <p className='text-blue-900 text-[13px] sm:text-[14px] md:text-[15px]'>
               Stay informed with the latest news and trends from around the world.
               </p>

               <h3 className='text-blue-900 text-[13px] sm:text-[14px] md:text-[15px]'>Privacy and Security Guaranteed.</h3>
          <p className='text-blue-900 text-[13px] sm:text-[14px] md:text-[15px]'>Your data is safe with us, thanks to our top-notch security measures.</p>
          {/* <h1>Ready to Get Started?</h1> */}
          <Link to={"/usersignup"}>

          <button className='border w-fit rounded mt-2 px-1 hover:text-white hover:bg-blue-300 hover:font-bold text-sm'>Register for Free</button>
          </Link>
          <div className='w-fit my-2 text-blue-900 text-[12px] ml-3'>OR</div>
          <Link className='border w-fit rounded  px-1 hover:text-white hover:bg-blue-300 hover:font-bold text-sm' to={"/userlogin"}>
          Log In
          </Link>
        </div>
        <div  className='w-full sm:w-1/2 bg-bl ue-100 sm:h-screen flex items-center justify-center'>
            
        <img className='' src={landingPageImage} alt="img" />
        </div>
           
    </div>
  )
}
