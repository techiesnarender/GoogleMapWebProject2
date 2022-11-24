import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../../services/auth.service";
import UserServices from "../../services/UserServices";

const Profile = () => {
  let navigate = useNavigate();
  /** Fecth Current user details */
  const currentUser = AuthService.getCurrentUser();
  const [loading, setLoading] = useState(false);

  const currentUserId = currentUser.id;
  //console.log(currentUserId);
  const [users, setUser] = useState({});

  useEffect(() => {
      retrieveUser();
      // eslint-disable-next-line
  },[]);

  const retrieveUser = () =>{
    setLoading(true);
      UserServices.get(currentUserId)
      .then(response => {
          setUser(response.data);
          setLoading(false);
          console.log(response.data);
      })
      .catch( e => {
          console.log(e);
      });
  };

/** Upload image code.. */

	const [selectedFile, setSelectedFile] = useState();
  const [loadingImg, setImgLoading] = useState(false);
	const changeHandler = (event) => {
		setSelectedFile(event.target.files[0]);
   
	};

	const handleSubmission = () => {
    setImgLoading(true);
		const formData = new FormData();

		formData.append('file', selectedFile);
    formData.append('email', currentUser.email);

		fetch(
			//'http://localhost:8080/api/users/uploadFile',
      'https://tomcat1.shiftescape.com/api/users/uploadFile',
			{
				method: 'POST',
				body: formData,
			}
		)
			.then( 
        () => {
          navigate("/profile");
          window.location.reload();
        },
        (response) => response.json() )
			.then((result) => {
				console.log('Success:', result);
        setImgLoading(false);
			})
			.catch((error) => {
				console.error('Error:', error);
        setImgLoading(false);
			});
	} ;
	
  return (
    <div className="container">
      <h3 className="text-center"><strong>Sitter Profile</strong></h3>
      {loading && (
        <span className="spinner-border" style={{ position: "fixed", zIndex:"1031", top:"50%", left: "50%", transform: "initial" }}></span>
        )}
       <div className="row">
          <div className="col-sm-3">     
          <div className="text-center">
            
    <img
      src={users.logo}
      className="avatar rounded-circle img-thumbnail"
      alt={users.contactname}
      draggable= "true"
      style={{height:"200px", width: "200px"}}
    />
    <h6>Upload a different photo...</h6> 
      <input
        type="file"
        name="file"
        className="text-center center-block file-upload"
        required="required"
        onChange={changeHandler}
      />

      <button className="btn btn-primary" disabled={loadingImg} onClick={handleSubmission}>
              {loadingImg && (
                <span className="spinner-border spinner-border-sm"></span>
              )}
              <span>Update</span>
            </button>
  </div>
  <br />
            </div>
          <div className="col-sm-9">
         
          <header className="jumbotron">
          
          <p>
            <strong>Contact Name:</strong> <span>{users.contactname}</span>
          </p>
          <p>
            <strong>Email:</strong> {users.email}
          </p>
          <p>
            <strong>Company Name:</strong> {users.company}
          </p>
          <p>
            <strong>Open Time:</strong> {users.open}
          </p>
          <p>
            <strong>Close Time:</strong> {users.close}
          </p>
          <p>
            <strong>Charges:</strong> {users.chargesperhour}
          </p>
          </header>
          </div>
       </div>
      {/* <p>
        <strong>Token:</strong> {currentUser.accessToken.substring(0, 20)} ...{" "}
        {currentUser.accessToken.substr(currentUser.accessToken.length - 20)}
      </p> */}
      {/* <p>
        <strong>Id:</strong> {currentUser.id}
      </p> */}
     
      {/* <strong>Authorities:</strong>
      <ul>
        {currentUser.roles &&
          currentUser.roles.map((role, index) => <li key={index}>{role}</li>)}
      </ul> */}
    </div>
  );
};

export default Profile;