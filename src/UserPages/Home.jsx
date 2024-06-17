import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PostFormCard from "../Components/PostFormCard";
import PostCard from "../Components/PostCard";
import "../Icons/input.css";
import { useDispatch, useSelector } from "react-redux";
import { setAllPosts } from "../redux/userSlice"; 
import userService from "../ServiceLayer/userSevice";
import { welcomeImage } from "../Utility/utility";

function Home() {
  const {userPosts} = useSelector((state)=>state.user)
  const [user, setUser] = useState(null);
  const dispatch = useDispatch();
  const [posts, setPost] = useState([]);
  const userId = localStorage.getItem("userId");
 

  useEffect(() => {
    const getUser = async () => {
      const user = await userService.getUser(userId);

      dispatch(setUser({ user: user.data }));
      setUser(user.data);
    };

    getUser();
  }, []);

  useEffect(() => {
    const posts = async () => {
      const data = await userService.getPosts(userId);
      setPost(data.posts);
      dispatch(setAllPosts(data.posts))
    };
    posts();
 
  }, []);

  return (
    <div className=" w-full ">
      <div>
        <PostFormCard  />
      </div>

      {
        userPosts?.length ?

      <div className=" ">
        {userPosts?.map((post) => {
          return (
            <PostCard
              key={post._id}
              post={post}
              posts={posts}
              setPost={setPost}
            />
          );
        })}
      </div>
      :

      <div className="w-full h-fit ">
        <img className="w-full h-fit" src={welcomeImage} alt="" />
      </div>
      }

    </div>
  );
}

export default Home;
