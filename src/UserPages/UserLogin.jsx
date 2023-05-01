
import { useContext, useEffect, useState } from 'react';
import { Link ,useNavigate} from 'react-router-dom'
import { useForm } from "react-hook-form";
import { ToastContainer,toast } from 'react-toastify'
import axios from "axios"
import { ProfileDetailsContext } from '../Context/ProfileContext';
import { useCookies } from "react-cookie";
import { baseUrl } from '../Utility/utility';




const UserLogin = () => {
  const [user,setUser]=useState(null)



  const navigate=useNavigate()



  
  const userId = JSON.parse(localStorage.getItem('userId'));

  useEffect(()=>{
   

    
    

    if(!userId){

    }else{
      navigate('/')
    }


  },[user])




  const [cookies, removeCookie] = useCookies([]);
  const { setProfile } = useContext(ProfileDetailsContext);




 const generateError =(err) =>{
  toast.error(err,{
    position:"top-right"
  })
}
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const onSubmit = async (datas) => {
    try {
      const  { data }  = await axios.post(
        `${baseUrl}/auth/userlogin`,
        { ...datas},
        {
          withCredentials: true,
        }
      );
   
      if(data){
        console.log(data , "success")
        if(data.errors){ 
          console.log(data.errors);
          const {email,password,block} =data.errors;
          if(email){ 
             generateError(email) }
          else if(password) {
            generateError(password)
          }
          else if(block) {
            generateError(block)
          }
        }else{ 
          const token=data.token
          console.log(token,'tokendddddddddddddddddd')
          console.log("here at user login")
          document.cookie=`jwt=${token}`

    const verifyUser = async () => {
      console.log("-----1-----");

      if (!cookies.jwt) {

        navigate("/userLogin");
      } else {

        console.log("-----2-----");
        console.log(token);

        const { data } = await axios.post(
          `${baseUrl}/auth`,
          {

          },
          {
            headers: { authorization: "Bearer "+ token},
          },
          // {
          //   withCredentials: true,
          // }
        );

        console.log("data-----",data);

        if (!data.status) {
          console.log("-----6-----");

          removeCookie("jwt");
          navigate("/userLogin");
        } else {
          console.log("--------------------------last------------------------------");

         localStorage.setItem('userId', JSON.stringify(data.user._id))

         
         navigate("/")
         
        }
        
      }
    };
    

    verifyUser();
 



        }
      }
    } catch (err) {

      console.log(err);
      console.log("data");
    }
    };




  return (
    <div>
        <div className="bg-gradient-to-tr from-fuchsia-500 to-sky-300">
  <section id="login" className="p-4 flex flex-col justify-center min-h-screen max-w-md mx-auto">
    <div className="p-6 bg-sky-50 rounded">
      <div className="flex items-center justify-center font-black m-3 mb-12">
        

      <h1 className="tracking-wide text-3xl text-gray-900">NEW WORLD</h1>
      </div>
        <form  onSubmit={handleSubmit(onSubmit)}

        className="flex flex-col justify-center">
      
   <label className="text-sm font-medium">Email</label>
          <input className="mb-3 px-2 py-1.5
          mb-3 mt-1 block w-full px-2 py-1.5 border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400
          focus:outline-none
          focus:border-sky-500
          focus:ring-1
          focus:ring-sky-500
          focus:invalid:border-red-500 focus:invalid:ring-red-500" type="text" name="email" placeholder="Enter  email" 
          {...register("email", {
            required: true,
            pattern: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/
          })}
          />
            {errors.email && errors.email.type === "required" && (
            <p style={{color:"red"}}>Email is required.</p>
          )}
          {errors.email && errors.email.type === "pattern" && (
            <p style={{color:"red"}}>Email is not valid.</p>
          )}


<label className="text-sm font-medium">Password</label>
          <input className="mb-3 px-2 py-1.5
          mb-3 mt-1 block w-full px-2 py-1.5 border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400
          focus:outline-none
          focus:border-sky-500
          focus:ring-1
          focus:ring-sky-500
          focus:invalid:border-red-500 focus:invalid:ring-red-500" type="password" name="password" placeholder="Enter password"
          {...register("password", {
            required: "Password is required.",
            minLength: {
              value: 6,
              message: "Password should be at-least  characters."
            }
          })}
      />
      {errors.password && (
    <p style={{color:"red"}}>{errors.password.message}</p>
  )}
          <button className="mt-6 px-4 py-1.5 rounded-md shadow-lg bg-gradient-to-r from-pink-600 to-red-600 font-medium text-gray-100 block transition duration-300" type="submit">
           
            <span id="login_default_state">Login<span id="subtotal"></span></span>
          </button>
        </form>
        <ToastContainer />

		<div className="mt-6 text-grey-dark">
                    Don't have an account ?
                    <Link to={"/usersignup"}><span className='ml-2' style={{color:"blue"}} >Sign up</span></Link>
                </div>

                <div className="mt-6 text-grey-dark">
                    <Link to={"/userotplogin"}><span style={{color:"blue"}} >Login with OTP</span></Link>
                </div>
    </div>
  </section>

 
</div>
    </div>
  )
}

export default UserLogin

