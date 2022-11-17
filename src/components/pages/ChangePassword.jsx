import React, { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import AuthService from '../../services/auth.service';

const ChangePassword = () => {

  const currentUser = AuthService.getCurrentUser();
    let navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const form = useRef();
    const checkBtn = useRef();

    const [oldpassword, setOldPassword] = useState("");
    const [newpassword, setNewPassword] = useState("");

    const onChangeOldPassword = (e) => {
        const oldpassword = e.target.value;
        setOldPassword(oldpassword);
      };

      const onChangeNewPassword = (e) => {
        const newpassword = e.target.value;
        setNewPassword(newpassword);
      };

    const handleChangePassword = (e) =>{ debugger
        e.preventDefault();

         setMessage("");
         setLoading(true);
        AuthService.changepassword(oldpassword, newpassword, currentUser.email).then(
            () => {
              navigate("/profile");
              window.location.reload();
            },
            (error) => {
              const resMessage =
                (error.response &&
                  error.response.data &&
                  error.response.data.message) ||
                error.message ||
                error.toString();
    
              setLoading(false);
              setMessage(resMessage);
            }
          );
    }
  return (
    <div className="col-md-12">
      <div className="card card-container">
      <div className="card-header bg-info text-white">
            Change Password
      </div>
        <form onSubmit={handleChangePassword} ref={form}>
          <div className="form-group">
            <label htmlFor="oldpassword">Old Password</label>
            <input
              type="password"
              className="form-control"
              name="oldpassword"
              value={oldpassword}
              onChange={onChangeOldPassword}
            />
          </div>

          <div className="form-group">
            <label htmlFor="newpassword">New Password</label>
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

          {message && (
            <div className="form-group">
              <div className="alert alert-danger" role="alert">
                {message}
              </div>
            </div>
          )}
          <button style={{ display: "none" }} ref={checkBtn} />
        </form>
      </div>
    </div>
  )
}

export default ChangePassword