import React, { useEffect, useState } from "react";
import moment from "moment";
import { getUsersAll } from "../apiRequest/apiRequest";
import { FaThumbsUp } from "react-icons/fa";
import { getUserDetails } from "../helper/sessionHelper";

const Comment = ({ comment, onLike }) => {
  const [user, setUser] = useState({});
  const userDetails = getUserDetails();
  useEffect(() => {
    (async () => {
      await getUsersAll(comment.userEmail).then((res) => {
        setUser(res);
      });
    })();
  }, [comment]);

  return (
    <div className='flex p-4 border-b text-sm'>
      <div className='flex-shrink-0 mr-3'>
        <img
          className='w-10 h-10 rounded-full bg-gray-200'
          src={user ? user["photo"] : "#"}
          alt={user ? user["username"] : ""}
        />
      </div>
      <div className='flex-1'>
        <div className='flex items-center mb-1'>
          <span className='font-bold mr-1 text-xs truncate'>
            {user ? `@${user["username"]}` : "anonymous user"}
          </span>
          <span className='text-gray-500 text-xs'>
            {moment(comment.createdAt).fromNow()}
          </span>
        </div>
        <p className='text-gray-500 pb-2'>{comment.content}</p>
        <div>
          <button
            className={`text-gray-400 hover:text-blue-500 ${
              getUserDetails &&
              comment.likes.includes(userDetails["email"]) &&
              "!text-blue-500"
            }`}
            type='button'
            onClick={() => onLike(comment._id)}
          >
            <FaThumbsUp className='text-sm' />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Comment;
