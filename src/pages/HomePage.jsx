import React, { useEffect, useState } from "react";
import Slider from "../components/Slider";
import { postListRequest } from "../apiRequest/apiRequest";
import PostCard from "../components/PostCard";

const HomePage = () => {
  const [posts, setPosts] = useState([]);
  console.log(posts);
  useEffect(() => {
    (async () => {
      const res = await postListRequest();

      // Ensure res.posts is an array before setting it to userPosts
      if (Array.isArray(res.posts)) {
        setPosts(res.posts);
      }
    })();
  }, []);
  return (
    <div className='min-h-screen'>
      <div className='flex flex-col gap-6 lg:p-28 p-3 max-w-6xl mx-auto'>
        <h1 className='text-3xl font-bold lg:text-6xl'>Welcome to my blog</h1>
        <p className='text-gray-500 text-xs sm:text-sm'>
          This Blog website for web development. Specially you can find here
          JavaScript related documentation. You will get proper knowledge about
          web development in here.
        </p>
      </div>
      <div className='p-3'>
        <Slider />
      </div>

      <div className='max-w-6xl mx-auto p-3 flex flex-col gap-8 py-7'>
        {posts && posts.length > 0 && (
          <div className='flex flex-col gap-6'>
            <h2 className='text-2xl font-semibold text-center'>Recent Posts</h2>
            <div className='flex flex-wrap gap-4'>
              {posts.map((post) => (
                <PostCard key={post._id} post={post} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
