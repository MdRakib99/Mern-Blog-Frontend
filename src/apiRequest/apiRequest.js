import axios from "axios";
import { errorToast, successToast } from "../helper/formHelper";

const BaseURL = "http://localhost:5000/api/v1";

export function signUpRequest(email, username, password) {
  let URL = `${BaseURL}/sign-up`;

  let postBody = { email: email, username: username, password: password };

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
