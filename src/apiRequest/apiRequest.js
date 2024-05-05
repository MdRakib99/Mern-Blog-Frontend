import axios from "axios";
import { errorToast, successToast } from "../helper/formHelper";
import { getToken, setToken, setUserDetails } from "../helper/sessionHelper";
import store from "../redux/store";
import { setProfile } from "../redux/user/profileSlice";

const BaseURL = "http://localhost:5001/api/v1";

const axiosHeader = { headers: { token: getToken() } };

export function signUpRequest(email, username, password, photo) {
  let URL = `${BaseURL}/sign-up`;

  let postBody = {
    email: email,
    username: username,
    password: password,
    photo: photo,
  };

  return axios.post(URL, postBody).then((res) => {
    if (res.status === 200) {
      if (res.data["status"] === "fail") {
        if (res.data["data"].includes("duplicate key error")) {
          errorToast("Email Already Exist!");
          return false;
        } else {
          errorToast("Something went wrong!");
        }
      } else {
        successToast("Sign Up Successfull");
        return true;
      }
    }
  });
}

export function signInRequest(email, password) {
  let URL = `${BaseURL}/login`;

  let postBody = { email: email, password: password };

  return axios
    .post(URL, postBody)
    .then((res) => {
      console.log(res);
      if (res.status === 200) {
        setToken(res.data["token"]);
        setUserDetails(res.data["data"]);
        successToast("login Success!");
        return true;
      } else {
        errorToast("invalid email or password!");
        return false;
      }
    })
    .catch((err) => {
      errorToast("Something went wrong");
      return false;
    });
}

export function profileDetailsRequest() {
  let URL = `${BaseURL}/profileDetails`;

  return axios
    .get(URL, axiosHeader)
    .then((res) => {
      if (res.status === 200) {
        store.dispatch(setProfile(res.data["data"][0]));
      } else {
        errorToast("something went wrong!");
      }
    })
    .catch((err) => {
      console.error("Error fetching profile details:", err);
      errorToast("Something went wrong!");
    });
}

export function profileUpdateRequest(email, username, password, photo) {
  let URL = `${BaseURL}/updateProfile`;

  let postBody = {
    email: email,
    username: username,
    password: password,
    photo: photo,
  };

  let userDetails = {
    email: email,
    username: username,

    photo: photo,
  };

  return axios
    .post(URL, postBody, axiosHeader)
    .then((res) => {
      if (res.status === 200) {
        successToast("Successfully updated Profile");
        setUserDetails(userDetails);

        return true;
      } else {
        errorToast("Something went wrong!");
        return false;
      }
    })
    .catch((err) => {
      errorToast("Something went wrong!");
    });
}

// Create Post

export function createPostRequest(postData) {
  let URL = `${BaseURL}/create-post`;

  return axios
    .post(URL, postData, axiosHeader)
    .then((res) => {
      console.log(res.data);
      if (res.status === 201) {
        return res.data["data"];
      } else {
        return false;
      }
    })
    .catch((err) => {
      errorToast("something went wrong!");
      throw err;
    });
}

// Blog List

export function postListRequest() {
  let URL = `${BaseURL}/posts-list`;

  return axios
    .get(URL, axiosHeader)
    .then((res) => {
      if (res.status === 200) {
        return res.data["data"];
      } else {
        return false;
      }
    })
    .catch((err) => {
      errorToast("something went wrong!");
      throw err;
    });
}
export function allPostListRequest() {
  let URL = `${BaseURL}/posts-list-all`;

  return axios
    .get(URL)
    .then((res) => {
      if (res.status === 200) {
        return res.data["data"];
      } else {
        return false;
      }
    })
    .catch((err) => {
      errorToast("something went wrong!");
      throw err;
    });
}

//Delete Blog

export function deleteBlogRequest(id) {
  let URL = `${BaseURL}/delete-post/${id}`;

  return axios
    .delete(URL, axiosHeader)
    .then((res) => {
      if (res.status === 200) {
        return true;
      } else {
        return false;
      }
    })
    .catch((err) => {
      errorToast("something went wrong!");
      throw err;
    });
}

export function getPostRequest(id) {
  let URL = `${BaseURL}/get-post/${id}`;

  return axios
    .get(URL, axiosHeader)
    .then((res) => {
      if (res.status === 200) {
        return res.data["data"];
      } else {
        return false;
      }
    })
    .catch((err) => {
      errorToast("something went wrong!");
      throw err;
    });
}

export function updatePostRequest(postData, id) {
  let URL = `${BaseURL}/update-post/${id}`;

  return axios
    .post(URL, postData, axiosHeader)
    .then((res) => {
      if (res.status === 200) {
        return res.data["data"];
      } else {
        return false;
      }
    })
    .catch((err) => {
      errorToast("something went wrong!");
      throw err;
    });
}

export function getUsersRequest() {
  let URL = `${BaseURL}/get-users`;

  return axios
    .get(URL, axiosHeader)
    .then((res) => {
      if (res.status === 200) {
        return res.data["data"];
      } else {
        return false;
      }
    })
    .catch((err) => {
      errorToast("something went wrong!");
      throw err;
    });
}

export function deleteUsersRequest(id) {
  let URL = `${BaseURL}/delete-user/${id}`;

  return axios
    .delete(URL, axiosHeader)
    .then((res) => {
      if (res.status === 200) {
        return true;
      } else {
        return false;
      }
    })
    .catch((err) => {
      errorToast("something went wrong!");
      throw err;
    });
}
