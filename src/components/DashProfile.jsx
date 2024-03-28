import React, { useEffect } from "react";
import { Button, TextInput } from "flowbite-react";
import { profileDetailsRequest } from "../apiRequest/apiRequest";
import { useSelector } from "react-redux";

const DashProfile = () => {
  useEffect(() => {
    (() => {
      profileDetailsRequest();
    })();
  }, []);

  // const previewImage = () => {
  //   let ImgFile = userImgRef.files[0];
  //   getBase64(ImgFile).then((base64Img) => {
  //     userImgView.src = base64Img;
  //   });
  // };

  const profileData = useSelector((state) => state.profile.value);

  return (
    <div className='max-w-lg mx-auto p-3 w-full'>
      <h1 className='my-7 text-center font-semibold text-3xl'>Profile</h1>
      <form className='flex flex-col gap-5'>
        <div className='w-20 h-20 self-center cursor-pointer shadow-md overflow-hidden rounded-full'>
          <img
            src={profileData["photo"]}
            alt=''
            className='rounded-full w-full h-full object-cover border-8 border-[lightgray]'
          />
        </div>
        <TextInput
          type='text'
          id='username'
          placeholder='username'
          defaultValue={profileData["username"]}
        />
        <TextInput
          type='email'
          id='email'
          placeholder='email'
          defaultValue={profileData["email"]}
          readOnly
        />
        <TextInput
          type='password'
          id='password'
          placeholder='******'
          defaultValue={profileData["password"]}
        />
        <Button type='submit' gradientDuoTone='greenToBlue' outline>
          Update
        </Button>
      </form>
    </div>
  );
};

export default DashProfile;
