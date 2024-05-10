import React, { useEffect, useState } from "react";
import { getUserDetails } from "../helper/sessionHelper";
import { Link } from "react-router-dom";
import { Button, TextInput, Textarea } from "flowbite-react";

const CommentSection = ({ postId }) => {
  const [comment, setComment] = useState("");
  const userDetails = getUserDetails();
  console.log(userDetails);

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
        <form className='border border-teal-500 p-3 rounded-md '>
          <Textarea
            placeholder='Add a comment'
            rows='3'
            maxLength='200'
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
    </div>
  );
};

export default CommentSection;
