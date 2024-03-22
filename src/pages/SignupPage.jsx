import { Button, Label, Spinner, TextInput } from "flowbite-react";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { errorToast, isEmail, isEmpty } from "../helper/formHelper";
import { signUpRequest } from "../apiRequest/apiRequest";

const SignupPage = () => {
  const [formData, setFormData] = useState({});
  const [loader, setLoader] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    setLoader(true);
    e.preventDefault();

    let email = formData.email;
    let username = formData.username;
    let password = formData.password;

    if (isEmail(email)) {
      errorToast("Valid Email Required");
    } else if (isEmpty(username)) {
      errorToast("Username required");
    } else if (isEmpty(password)) {
      errorToast("Password Required");
    } else {
      setLoader(true);
      await signUpRequest(email, username, password);
      setLoader(false);
    }
  };

  return (
    <div className='min-h-screen mt-20'>
      <div className='flex p-3 max-w-5xl mx-auto flex-col md:flex-row md:items-center gap-5 '>
        {/* left side */}
        <div className='flex-1'>
          <h1 className='text-5xl font-bold'>Sign Up Now!</h1>
          <p className='py-6'>
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
            a id nisi.
          </p>
        </div>
        {/* Right Side */}
        <div className='flex-1'>
          <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
            <div>
              <Label value='Your Email' />
              <TextInput
                type='email'
                placeholder='name@company.com'
                id='email'
                onChange={handleChange}
              />
            </div>
            <div>
              <Label value='Your Username' />
              <TextInput
                type='text'
                placeholder='Username'
                id='username'
                onChange={handleChange}
              />
            </div>
            <div>
              <Label value='Your Password' />
              <TextInput
                type='password'
                placeholder='Password'
                id='password'
                onChange={handleChange}
              />
            </div>
            <Button
              gradientDuoTone='greenToBlue'
              type='submit'
              disabled={loader}
            >
              {loader ? (
                <>
                  <Spinner size='sm' />
                  <span className='pl-3'>Loading...</span>
                </>
              ) : (
                "Sign Up"
              )}
            </Button>
          </form>
          <div className='flex gap-2 text-sm mt-5'>
            <span>Already have and account?</span>
            <Link to='sign-in' className='text-blue-500'>
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
