class sessionHelper {
  setToken(token) {
    localStorage.setItem("token", token);
  }
  getToken() {
    return localStorage.getItem("token");
  }

  setUserDetails(userDetails) {
    localStorage.setItem("userDetails", JSON.stringify(userDetails));
  }
  getUserDetails() {
    const userDetailsString = localStorage.getItem("userDetails");
    return userDetailsString ? JSON.parse(userDetailsString) : null;
  }

  setEmail(email) {
    localStorage.setItem("email", email);
  }
  getEmail() {
    return localStorage.getItem("email");
  }

  setOTP(OTP) {
    localStorage.setItem("OTP", OTP);
  }
  getOTP() {
    return localStorage.getItem("OTP");
  }

  removeSessions = () => {
    localStorage.clear();
    window.location.href = "/login";
  };
}
export const {
  setEmail,
  getEmail,
  setOTP,
  getOTP,
  setToken,
  getToken,
  setUserDetails,
  getUserDetails,
  removeSessions,
} = new sessionHelper();
