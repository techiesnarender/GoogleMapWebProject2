import axios from "axios";

const API_URL = "https://tomcat1.shiftescape.com/api/auth/";
const API_ChangePassword_URL = "https://tomcat1.shiftescape.com/api/users/";

// const API_URL = "http://localhost:8080/api/auth/"
// const API_ChangePassword_URL = "http://localhost:8080/api/users/";
const API_ForgetPassword_URL = "http://localhost:8080/api/";
const login = (email, password) => {
  return axios
    .post(API_URL + "signin", {
      email,
      password,
    })
    .then((response) => {
      if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }
      console.log(response.data);
      return response.data;
      
    });
};

const changepassword = (oldpassword, newpassword) =>{
  return axios
    .post(API_ChangePassword_URL + "changepassword", {
      oldpassword,
      newpassword,
    })
    .then((response) => {
      console.log(response.data);
      return response.data;
      
    });
}

const fogetPassword = (email) =>{
  return axios
    .post(API_ForgetPassword_URL + "forgot_password", {
      email,
    })
    .then((response) => {
      console.log(response.data);
      return response.data;
      
    });
}

const resetPassword = (token, password) =>{
  return axios
    .post(API_ForgetPassword_URL + "reset_password", {
      token,
      password
    })
    .then((response) => {
      console.log(response.data);
      return response.data;
      
    });
}

const logout = () => {
  localStorage.removeItem("user");
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

const AuthService = {
  login,
  logout,
  changepassword,
  fogetPassword,
  resetPassword,
  getCurrentUser,
};

export default AuthService;