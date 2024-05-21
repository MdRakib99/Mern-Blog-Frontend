import React, { useEffect, useState } from "react";
import { getUserDetails } from "../helper/sessionHelper";
import { Link, useNavigate } from "react-router-dom";
import { Button, TextInput, Textarea } from "flowbite-react";
import {
  createCommentRequest,
  getCommentRequest,
  likeCommentRequest,
} from "../apiRequest/apiRequest";
import { errorToast, successToast } from "../helper/formHelper";
import Comment from "./Comment";

const CommentSection = ({ postId }) => {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const userDetails = getUserDetails();
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (comment.length > 200) {
      return;
    }

    try {
      // Prepare data to be sent in the request
      const postData = {
        postId: postId,
        userEmail: userDetails.email,
        content: comment,
      };

      // Call the createCommentRequest function with postData
      await createCommentRequest(postData).then((res) => {
        if (!res === false) {
          successToast("Comment added successfully");
          setComment("");
          // setComments([data, ...comments]);
        }
      });
    } catch (error) {
      // Handle errors
      errorToast("You have to signin for comment");
    }
  };

  useEffect(() => {
    (async () => {
      await getCommentRequest(postId).then((res) => {
        if (!res === false) {
          setComments(res["data"]);
        }
      });
    })();
  }, [postId]);

  const handleLike = async (commentId) => {
    if (!userDetails) {
      navigate("/sign-in");
      return;
    }

    try {
      await likeCommentRequest(commentId).then((res) => {
        if (res) {
          setComments((prevComments) =>
            prevComments.map((comment) =>
              comment._id === commentId ? res.data : comment
            )
          );
        }
      });
    } catch (error) {
      errorToast("Something went wrong!");
    }
  };

  return (
    <div className='max-w-2xl mx-auto w-full p-3'>
      {userDetails ? (
        <div className='flex items-center gap-1 my-5 text-gray-500 text-sm'>
          <p>Signed in as:</p>
          <img
            className='h-5 w-5 object-cover rounded-full'
            src={userDetails.photo}
            alt=''
          />
          <Link
            to={"/dashboard?tab=profile"}
            className='text-xs text-cyan-500 hover:underline'
          >
            @{userDetails.username}
          </Link>
        </div>
      ) : (
        <div className='text-sm text-teal-500 my-5 flex gap-1'>
          You must be login to comment
          <Link to={"/sign-in"} className='text-blue-500'>
            Sign In
          </Link>
        </div>
      )}
      {userDetails && (
        <form
          onSubmit={handleSubmit}
          className='border border-teal-500 p-3 rounded-md '
        >
          <Textarea
            placeholder='Add a comment'
            rows='3'
            maxLength='200'
            value={comment}
            onChange={(e) => {
              setComment(e.target.value);
            }}
          />
          <div className='flex justify-between items-center mt-5'>
            <p className='text-gray-500 text-xs'>
              {200 - comment.length} charecter remaining
            </p>
            <Button outline gradientDuoTone='greenToBlue' type='submit'>
              Submit
            </Button>
          </div>
        </form>
      )}
      {comments.length === 0 ? (
        <p className='text-sm my-5'>No Comments yet!</p>
      ) : (
        <>
          <div className='text-sm my-5 flex items-center gap-1'>
            <p>Commets</p>
            <div className='border border-gray-400 py-1 px-2 rounded-sm'>
              <p>{comments.length}</p>
            </div>
          </div>
          {comments.map((comment) => (
            <Comment key={comment._id} comment={comment} onLike={handleLike} />
          ))}
        </>
      )}
    </div>
  );
};

export default CommentSection;
