import React, { useState } from 'react'
import AuthService from '../../services/auth.service';

const ChangePassword = () => {

    const currentUser = AuthService.getCurrentUser();
    const [oldpassword, setOldPassword] = useState("");
    const [newpassword, setNewPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [successful, setSuccessful] = useState(false);
    const [message, setMessage] = useState("");

    const onChangeOldPassword = (e) => {
        const oldpassword = e.target.value;
        setOldPassword(oldpassword);
      };
      const onChangeNewPassword = (e) => {
        const newpassword = e.target.value;
        setNewPassword(newpassword);
      };

    const handleChangePassword = (e) =>{
        e.preventDefault();
        setMessage("");
        setSuccessful(false);
        setLoading(true);
        AuthService.changepassword(oldpassword, newpassword, currentUser.email).then(response => {
          setMessage("You have successfully changed your password.");
          setSuccessful(true);
          setLoading(false);
          console.log(response.data);  
      },
      (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setMessage(resMessage);
        setSuccessful(false);
        setLoading(false);
      }
        );
    }
  return (
    <div className="col-md-12">
      <div className="card card-container">
      <div className="card-header p-3 mb-2 bg-dark text-white">
            Change Password
      </div>
        <form onSubmit={handleChangePassword}>     
          <div>
          <div className="form-group">
            <label htmlFor="oldpassword">Old password</label>
            <input
              type="password"
              className="form-control"
              name="oldpassword"
              value={oldpassword}
              onChange={onChangeOldPassword}
            />
          </div>
          <div className="form-group">
            <label htmlFor="newpassword">New password</label>
            <input
              type="password"
              className="form-control"
              name="newpassword"
              value={newpassword}
              onChange={onChangeNewPassword}
            />
          </div>
          <div className="form-group">
            <button className="btn btn-primary btn-block" disabled={loading}>
              {loading && (
                <span className="spinner-border spinner-border-sm"></span>
              )}
              <span>Update Password</span>
            </button>
          </div>
          </div>
          {message && (
            <div className="form-group">
              <div
                className={ successful ? "alert alert-success" : "alert alert-danger" }
                role="alert"
              >
                {message}
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  )
}
export default ChangePassword