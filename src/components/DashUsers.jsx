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
import { deleteUsersRequest, getUsersRequest } from "../apiRequest/apiRequest";
import { Link } from "react-router-dom";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { errorToast, successToast } from "../helper/formHelper";
import { FaCheck, FaTimes } from "react-icons/fa";

const DashUsers = () => {
  const profileData = getUserDetails();
  const [users, setUsers] = useState([]);

  const [showModal, setShowModal] = useState(false);
  const [deleteId, setDeleteId] = useState(""); // State to store the post id to be deleted

  useEffect(() => {
    (async () => {
      const res = await getUsersRequest();
      console.log(res);
      // Ensure res.posts is an array before setting it to userPosts
      if (Array.isArray(res)) {
        setUsers(res);
      }
    })();
  }, []);

  const handleDeleteUser = (id) => {
    setShowModal(false);
    deleteUsersRequest(id).then((result) => {
      if (result === true) {
        successToast("Delete Successfully");
        // After successful deletion, update the userPosts state to remove the deleted post
        setUsers(users.filter((user) => user._id !== id));
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
      {profileData.isAdmin && users.length > 0 ? (
        <>
          <Table hoverable className='shadow-sd'>
            <TableHead>
              <TableHeadCell>Created Date</TableHeadCell>
              <TableHeadCell>User Image</TableHeadCell>
              <TableHeadCell>UserName</TableHeadCell>
              <TableHeadCell>Admin</TableHeadCell>
              <TableHeadCell>Delete</TableHeadCell>
            </TableHead>
            <TableBody className='divide-y' key={users._id}>
              {/* Mapping through userPosts */}
              {users.map((user) => (
                <TableRow className='bg-white'>
                  {/* Ensure each child in a list should have a unique "key" prop */}
                  <TableCell>
                    {new Date(user.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <Link>
                      <img
                        src={user.photo}
                        alt={user.title}
                        className='w-10 h-10  object-cover rounded-full bg-gray-500'
                      />
                    </Link>
                  </TableCell>
                  <TableCell>
                    <Link
                      className='font-medium text-gray-900'
                      //   to={`/post/${post.slug}`}
                    >
                      {user.email}
                    </Link>
                  </TableCell>
                  <TableCell>
                    {user.isAdmin ? (
                      <FaCheck className='text-green-500' />
                    ) : (
                      <FaTimes className='text-red-500' />
                    )}
                  </TableCell>
                  <TableCell>
                    <span
                      onClick={() => openDeleteModal(user._id)} // Pass post id to openDeleteModal function
                      className='font-medium text-red-500 hover:underline cursor-pointer'
                    >
                      Delete
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </>
      ) : (
        <p>You cant show any user!</p>
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
                  handleDeleteUser(deleteId); // Pass deleteId to handleDeletePost function
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
