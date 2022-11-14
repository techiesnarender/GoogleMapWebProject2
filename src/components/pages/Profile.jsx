import React, { useEffect, useState } from "react";
import AuthService from "../../services/auth.service";
import UserServices from "../../services/UserServices";

const Profile = () => {
  const currentUser = AuthService.getCurrentUser();

  const currentUserId = currentUser.id;
  //console.log(currentUserId);
  const [users, setUser] = useState({});

  useEffect(() => {
      retrieveUser();
      // eslint-disable-next-line
  }, []);

  const retrieveUser = () =>{
    //setLoading(true);
      UserServices.get(currentUserId)
      .then(response => {
          setUser(response.data);
          //setLoading(false);
          console.log(response.data);
      })
      .catch( e => {
          console.log(e);
      });
  };

  return (
    <div className="container">
      <header className="jumbotron">
        <h3>
          <strong>{users.email}</strong> Profile
        </h3>
      </header>
      {/* <p>
        <strong>Token:</strong> {currentUser.accessToken.substring(0, 20)} ...{" "}
        {currentUser.accessToken.substr(currentUser.accessToken.length - 20)}
      </p> */}
      {/* <p>
        <strong>Id:</strong> {currentUser.id}
      </p> */}
      <p>
        <strong>Contact Name:</strong> {users.contactname}
      </p>
      <p>
        <strong>Email:</strong> {currentUser.email}
      </p>
      {/* <strong>Authorities:</strong>
      <ul>
        {currentUser.roles &&
          currentUser.roles.map((role, index) => <li key={index}>{role}</li>)}
      </ul> */}
    </div>
  );
};

export default Profile;