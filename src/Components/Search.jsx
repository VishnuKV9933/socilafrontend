import axios from 'axios';
import React ,{useEffect, useRef, useState}from 'react'
import Suggestion from './Suggestion';
import { baseUrl } from '../Utility/utility';
// import { useSelector } from "react-redux";
function Search({searchPasser}) {
    const userId = localStorage.getItem("userId");
    const [searchData,setSeacrhData]=useState(null)
    const[user,setUser]=useState(null)
    const[message,setMessage]=useState('')
    const inputRef=useRef()
    useEffect(()=>{
        const getUser=async()=>{
          const user = await axios.post(`${baseUrl}/users/getuser`, {
            userId: userId,
          });
         
          setUser(user.data)
        }
    
        getUser()
      },[])
    // const userObj =useSelector(state=>state.user)

    useEffect(()=>{
        if(inputRef.current.value.trim()===""){
          setMessage("")
          setSeacrhData(null)
        }

    },[searchData])

    function debouncedSearch(data, wait) {

     
      if(inputRef.current.value.trim()===""){
        setSeacrhData(null)
        setMessage("")
        return
      }

        if(data.trim()===""){
          setSeacrhData(null)
          setMessage("")
            return
        }

        let timeout;
        let search=data;
   
          const later = () => {

            clearTimeout(timeout);
            const fetchData=async()=>{

         let searchResult = await axios.get(`${baseUrl}/users/user/${userId}/search?search=${search}`,)
                 let {data,message}=searchResult.data
           
            
            if(!data){
              if(message){
                setMessage("No data found")
                setSeacrhData(null)
               
              }
            }else{
              setMessage("")
              setSeacrhData(data)
            
            }

             }

             fetchData()
          };
      
          clearTimeout(timeout);
          timeout = setTimeout(later, wait);
        };
      
        searchPasser(searchData,setSeacrhData)


  return (
    <div className="mt-1"> 
              <input ref={inputRef} onChange={(e)=>{
                debouncedSearch(e.target.value,500)
               
            }}
               className="w-full  bg-gradient-to-b from-sky-200  to-sky-00 hover:from-blue-200
                hover:to-pink-00 rounded-3xl mb-2 flex-row items-center 
                shadow-lg shadow-gray-200  border-amber-500	  p-4" placeholder="search " />
                <div className='ml-10 text-blue-300 italic font-serif' >{message}</div>

<div className='mt-3'>
{searchData?.map((elem) => {
              return <Suggestion  key={elem._id}  suggestion={elem} user={user}/>;
            })}
</div>

            </div>
  )
}

export default Search
