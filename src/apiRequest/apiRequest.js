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
        console.log(res.data["data"]);
      } else {
        errorToast("something went wrong!");
      }
    })
    .catch((err) => {
      errorToast("Something went wrong!");
    });
}
