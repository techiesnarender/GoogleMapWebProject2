import axios from "axios";

//const API_URL = "https://tomcat1.shiftescape.com/api/";
const API_URL = "http://localhost:8080/api/"

const login = (email, password) => {
  return axios
    .post(API_URL + "auth/signin", {
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

const changepassword = (oldpassword, newpassword, email) =>{
  return axios
    .post(API_URL + "users/changepassword", {
      oldpassword,
      newpassword,
      email,
    })
    .then((response) => {
      console.log(response.data);
      return response.data;
      
    });
}

const fogetPassword = (email) =>{
  return axios
    .post(API_URL + "forgot_password", {
      email,
    })
    .then((response) => {
      console.log(response.data);
      return response.data;
      
    });
}

const resetPassword = (token, password) =>{
  return axios
    .post(API_URL + "reset_password", {
      token,
      password
    })
    .then((response) => {
      console.log(response.data);
      return response.data;
      
    });
}

// const uploadImage = (file, email) =>{
//   return axios
//     .post(API_URL + "users/uploadFile", {
//       file,
//       email
//     })
//     .then((response) => {
//       console.log(response.data);
//       return response.data;
      
//     });
// }

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
  //uploadImage,
};

export default AuthService;