import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from "flowbite-react";
import React, { useEffect, useState } from "react";
import { getUserDetails } from "../helper/sessionHelper";
import { postListRequest } from "../apiRequest/apiRequest";
import { Link } from "react-router-dom";

const DashboardPosts = () => {
  const profileData = getUserDetails();
  const [userPosts, setUserPosts] = useState([]);
  console.log(userPosts);
  useEffect(() => {
    (async () => {
      const res = await postListRequest();

      // Ensure res.posts is an array before setting it to userPosts
      if (Array.isArray(res.posts)) {
        setUserPosts(res.posts);
      }
    })();
  }, []);
  return (
    <div className='table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300'>
      {profileData.isAdmin && userPosts.length > 0 ? (
        <>
          <Table hoverable className='shadow-sd'>
            <TableHead>
              <TableHeadCell>Date updated</TableHeadCell>
              <TableHeadCell>Post Image</TableHeadCell>
              <TableHeadCell>Post Title</TableHeadCell>
              <TableHeadCell>Category</TableHeadCell>
              <TableHeadCell>Delete</TableHeadCell>
              <TableHeadCell>
                <span>Edit</span>
              </TableHeadCell>
            </TableHead>
            <TableBody className='divide-y'>
              {/* Mapping through userPosts */}
              {userPosts.map((post) => (
                <TableRow key={post._id} className='bg-white'>
                  {/* Ensure each child in a list should have a unique "key" prop */}
                  <TableCell>
                    {new Date(post.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <Link to={`/post/${post.slug}`}>
                      <img
                        src={post.image}
                        alt={post.title}
                        className='w-20 h-10 object-cover bg-gray-500'
                      />
                    </Link>
                  </TableCell>
                  <TableCell>
                    <Link
                      className='font-medium text-gray-900'
                      to={`/post/${post.slug}`}
                    >
                      {post.title}
                    </Link>
                  </TableCell>
                  <TableCell>{post.category}</TableCell>
                  <TableCell>
                    <span className='font-medium text-red-500 hover:underline cursor-pointer'>
                      Delete
                    </span>
                  </TableCell>
                  <TableCell>
                    <Link to={`/update-post/${post._id}`}>
                      <span className='text-teal-500'>Edit</span>
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </>
      ) : (
        <p>You have no posts yet!</p>
      )}
    </div>
  );
};

export default DashboardPosts;
