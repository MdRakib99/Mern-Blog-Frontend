import React, { useEffect, useState } from "react";
import Slider from "../components/Slider";
import { allPostListRequest } from "../apiRequest/apiRequest";
import PostCard from "../components/PostCard";

const HomePage = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    (async () => {
      const res = await allPostListRequest();

      // Ensure res.posts is an array before setting it to userPosts
      if (Array.isArray(res.posts)) {
        setPosts(res.posts);
      }
    })();
  }, []);
  return (
    <div className='bg-gray-100 min-h-screen'>
      <div className='py-10 px-4 lg:px-20 max-w-6xl mx-auto'>
        <h1 className='text-4xl lg:text-6xl font-bold text-center text-blue-600 mb-6'>
          Explore the World of Web Development
        </h1>
        <p className='text-lg text-gray-700 leading-relaxed mb-10'>
          Welcome to our blog! Dive into the latest updates, tutorials, and
          insights on JavaScript, React, and other web development technologies.
          Whether you're a beginner or an experienced developer, there's
          something here for everyone.
        </p>
      </div>
      <div className='p-4 lg:p-0'>
        <Slider />
      </div>

      <div className='max-w-6xl mx-auto px-4 lg:px-20 py-10'>
        {posts && posts.length > 0 && (
          <div className=''>
            <h2 className='text-3xl font-semibold text-center text-gray-800 mb-8'>
              Recent Posts
            </h2>
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
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
