import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getPostRequest } from "../apiRequest/apiRequest";
import { Button, Spinner } from "flowbite-react";
import Slider from "../components/Slider";
import CommentSection from "../components/CommentSection";

const PostPage = () => {
  const { postSlug } = useParams();
  const [loading, setLoading] = useState(false);
  const [post, setPost] = useState(null);

  useEffect(() => {
    (async () => {
      setLoading(true);
      await getPostRequest(postSlug).then((res) => {
        if (res) {
          setPost(res);
          setLoading(false);
        }
      });
    })();
  }, [postSlug]);

  if (loading)
    return (
      <div className='flex justify-center items-center min-h-screen'>
        <Spinner size='xl' />
      </div>
    );
  return (
    <main className='p-3 flex flex-col max-w-6xl mx-auto min-h-screen'>
      <h1 className=' text-3xl mt-10 text-center font-serif max-w-2xl mx-auto lg:text-4xl'>
        {post && post.title}
      </h1>
      <Link>
        <Button color='gray' pill size='xs'>
          {post && post.category}
        </Button>
      </Link>
      <img
        src={post && post.image}
        alt={post && post.title}
        className='mt-10 p-3 max-h-[600px] w-full object-cover'
      />
      <div className='flex justify-between p-3 border-b border-slate-500 mx-auto w-full max-w-2xl text-xs'>
        <span>{post && new Date(post.createdAt).toLocaleDateString()}</span>
        <span className='italic'>
          {post && (post.description.length / 1000).toFixed(0)} mins read
        </span>
      </div>
      <div
        className='p-3 max-w-2xl mx-auto w-full'
        dangerouslySetInnerHTML={{ __html: post && post.description }}
      ></div>
      <div className='max-w-4xl mx-auto w-full post-content'>
        <Slider />
      </div>
      <div className='max-w-4xl mx-auto w-full'>
        <CommentSection postId={post && post._id} />
      </div>
    </main>
  );
};

export default PostPage;
