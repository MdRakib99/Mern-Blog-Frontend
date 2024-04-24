import {
  Button,
  Modal,
  ModalBody,
  ModalHeader,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from "flowbite-react";
import React, { useEffect, useState } from "react";
import { getUserDetails } from "../helper/sessionHelper";
import {
  deleteBlogRequest,
  getUsersRequest,
  postListRequest,
} from "../apiRequest/apiRequest";
import { Link } from "react-router-dom";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { errorToast, successToast } from "../helper/formHelper";

const DashUsers = () => {
  const profileData = getUserDetails();
  const [userPosts, setUserPosts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [deleteId, setDeleteId] = useState(""); // State to store the post id to be deleted

  useEffect(() => {
    (async () => {
      const res = await getUsersRequest();

      // Ensure res.posts is an array before setting it to userPosts
      if (Array.isArray(res.posts)) {
        setUserPosts(res.posts);
      }
    })();
  }, []);

  const handleDeletePost = (id) => {
    setShowModal(false);
    deleteBlogRequest(id).then((result) => {
      if (result === true) {
        successToast("Delete Successfully");
        // After successful deletion, update the userPosts state to remove the deleted post
        setUserPosts(userPosts.filter((post) => post._id !== id));
      } else {
        errorToast("Something went wrong!");
      }
    });
  };

  const openDeleteModal = (id) => {
    setDeleteId(id); // Set the post id to be deleted
    setShowModal(true);
  };

  return (
    <div className='table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300'>
      {profileData.isAdmin && userPosts.length > 0 ? (
        <>
          <Table hoverable className='shadow-sd'>
            <TableHead>
              <TableHeadCell>Created Date</TableHeadCell>
              <TableHeadCell>User Image</TableHeadCell>
              <TableHeadCell>UserName</TableHeadCell>
              <TableHeadCell>Admin</TableHeadCell>
              <TableHeadCell>Delete</TableHeadCell>
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
                    <span
                      onClick={() => openDeleteModal(post._id)} // Pass post id to openDeleteModal function
                      className='font-medium text-red-500 hover:underline cursor-pointer'
                    >
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
      <Modal
        show={showModal}
        onClick={() => setShowModal(false)}
        popup
        size='md'
      >
        <ModalHeader />
        <ModalBody>
          <div className='text-center'>
            <HiOutlineExclamationCircle className='h-14 w-14 text-gray-400 mb-4 mx-auto' />
            <h3>Are you sure, want to delete the post?</h3>
            <div className='flex justify-center gap-4'>
              <Button
                color='failure'
                onClick={() => {
                  handleDeletePost(deleteId); // Pass deleteId to handleDeletePost function
                }}
              >
                Yes, I'm sure
              </Button>
              <Button color='gray' onClick={() => setShowModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default DashUsers;
