import React, { useEffect, useRef, useState } from "react";
import { Button, Spinner, TextInput } from "flowbite-react";
import {
  profileDetailsRequest,
  profileUpdateRequest,
} from "../apiRequest/apiRequest";
import { useSelector } from "react-redux";
import { errorToast, getBase64, isEmail, isEmpty } from "../helper/formHelper";
import { Link, useNavigate } from "react-router-dom";

const DashProfile = () => {
  useEffect(() => {
    (() => {
      profileDetailsRequest();
    })();
  }, []);

  const profileData = useSelector((state) => state.profile.value);

  let navigate = useNavigate();
  const [loader, setLoader] = useState(false);

  let userImgRef = useRef(null);
  let usernameRef = useRef(null);
  let emailRef = useRef(null);
  let passwordRef = useRef(null);
  let userImgView = useRef();

  const previewImage = () => {
    let ImgFile = userImgRef.files[0];
    getBase64(ImgFile).then((base64Img) => {
      userImgView.src = base64Img;
    });
  };

  const updateMyProfile = () => {
    setLoader(true);
    let email = emailRef.current.value;
    let username = usernameRef.current.value;

    let password = passwordRef.current.value;
    let photo = userImgView.src;

    if (isEmail(email)) {
      setLoader(false);
      errorToast("Valid Email Address Required !");
    } else if (isEmpty(username)) {
      setLoader(false);
      errorToast("username Required!");
    } else if (isEmpty(password)) {
      setLoader(false);
      errorToast("Password Required !");
    } else {
      profileUpdateRequest(email, username, password, photo).then((res) => {
        setLoader(false);
      });
    }
  };

  return (
    <div className='max-w-lg mx-auto p-3 w-full'>
      <h1 className='my-7 text-center font-semibold text-3xl'>Profile</h1>
      <div className='flex flex-col gap-5'>
        <input
          type='file'
          accept='image/*'
          onChange={previewImage}
          ref={(input) => (userImgRef = input)}
          hidden
        />
        <div
          className='w-20 h-20 self-center cursor-pointer shadow-md overflow-hidden rounded-full'
          onClick={() => userImgRef.click()}
        >
          <img
            ref={(input) => (userImgView = input)}
            className='rounded-full w-full h-full object-cover border-8 border-[lightgray]'
            src={profileData["photo"]}
            alt=''
          />
        </div>
        <TextInput
          ref={usernameRef}
          type='text'
          id='username'
          placeholder='username'
          defaultValue={profileData["username"]}
        />
        <TextInput
          ref={emailRef}
          type='email'
          id='email'
          placeholder='Email'
          defaultValue={profileData["email"]}
          readOnly
        />
        <TextInput
          ref={passwordRef}
          type='password'
          id='password'
          placeholder='password'
          defaultValue={profileData["password"]}
        />
        <Button
          gradientDuoTone='greenToBlue'
          onClick={updateMyProfile}
          outline
          disabled={loader}
        >
          {loader ? (
            <>
              <Spinner size='sm' />
              <span className='pl-3'>Loading...</span>
            </>
          ) : (
            "Update"
          )}
        </Button>
        {profileData.isAdmin && (
          <Link to='/create-post'>
            <Button
              type='button'
              gradientDuoTone='tealToLime'
              className='w-full'
            >
              Create a post
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default DashProfile;

/////////////////////////////////////////////////////////////////////////////////

// import React, { useEffect, useState } from "react";
// import { Button, Spinner, TextInput } from "flowbite-react";
// import {
//   profileDetailsRequest,
//   profileUpdateRequest,
// } from "../apiRequest/apiRequest";
// import { useSelector } from "react-redux";
// import { errorToast, getBase64, isEmail, isEmpty } from "../helper/formHelper";

// const DashProfile = () => {
//   const profileData = useSelector((state) => state.profile.value);
//   useEffect(() => {
//     (() => {
//       profileDetailsRequest();
//     })();
//   }, []);

//   const [formData, setFormData] = useState({
//     email: profileData["email"],
//     username: profileData["username"],
//     password: profileData["password"],
//     photo: profileData["photo"],
//   });
//   console.log(formData);
//   const [base64Img, setBase64Img] = useState("");

//   const [loader, setLoader] = useState(false);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.id]: e.target.value });
//   };

//   const handleImgChange = (e) => {
//     const file = e.target.files[0];

//     if (file) {
//       getBase64(file).then((base64) => {
//         setBase64Img(base64);
//       });
//     }
//   };

//   const handleSubmit = async (e) => {
//     setLoader(true);
//     e.preventDefault();

//     let email = formData.email;
//     console.log(email);
//     let username = formData.username;
//     let password = formData.password;
//     let photo = base64Img;

//     if (isEmail(email)) {
//       errorToast("Valid Email Required");
//       setLoader(false);
//     } else if (isEmpty(username)) {
//       errorToast("Username required");
//       setLoader(false);
//     } else if (isEmpty(password)) {
//       errorToast("Password Required");
//       setLoader(false);
//     } else {
//       setLoader(true);
//       await profileUpdateRequest(email, username, password, photo).then(
//         (res) => {
//           setLoader(false);
//         }
//       );
//     }
//   };

//   return (
//     <div className='max-w-lg mx-auto p-3 w-full'>
//       <h1 className='my-7 text-center font-semibold text-3xl'>Profile</h1>
//       <form className='flex flex-col gap-5' onSubmit={handleSubmit}>
//         <input type='file' accept='image/*' onChange={handleImgChange} />
//         <div className='w-20 h-20 self-center cursor-pointer shadow-md overflow-hidden rounded-full'>
//           <img
//             src={base64Img || profileData["photo"]}
//             alt=''
//             className='rounded-full w-full h-full object-cover border-8 border-[lightgray]'
//           />
//         </div>
//         <TextInput
//           onChange={handleChange}
//           type='text'
//           id='username'
//           placeholder='username'
//           defaultValue={profileData["username"]}
//         />
//         <TextInput
//           onChange={handleChange}
//           type='email'
//           id='email'
//           placeholder='email'
//           defaultValue={profileData["email"]}
//           readOnly
//         />
//         <TextInput
//           onChange={handleChange}
//           type='password'
//           id='password'
//           placeholder='password'
//           defaultValue={profileData["password"]}
//         />
//         <Button gradientDuoTone='greenToBlue' type='submit' disabled={loader}>
//           {loader ? (
//             <>
//               <Spinner size='sm' />
//               <span className='pl-3'>Loading...</span>
//             </>
//           ) : (
//             "Update"
//           )}
//         </Button>
//       </form>
//     </div>
//   );
// };

// export default DashProfile;
