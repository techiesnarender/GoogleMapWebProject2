import React, { useRef } from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import AuthService from '../../services/auth.service';

function ResetPassword() {

    const authResult = new URLSearchParams(window.location.search); 
    const token = authResult.get('token')

    let navigate = useNavigate();
    const form = useRef();
    const checkBtn = useRef();

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [resetToken, setResetToken] = useState(token);
    const [password , setPassword] = useState("");

    const onChangePassword = (e) => {
        const password = e.target.value;
        setPassword(password);
      };    

      const onChangeToken = (e) => {
        const resetToken = e.target.value;
        setResetToken(resetToken);
      };  

      const handleResetPassword = (e) =>{
        e.preventDefault();
        setMessage("");
         setLoading(true);

        AuthService.resetPassword(token, password).then(
            () => {
              navigate("/home");
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
    <div className="container" style={{width: '40rem'}}>
			<div className="card">
				  <div className="card-header alert-info text-center h3">
				  <h2>Reset Password</h2>
				  </div>
                  <form onSubmit={handleResetPassword} ref={form}>
                    <div className="card-body">

                             <div className="form-group">
                                <input type="text" className="form-control" name='token' id="token" aria-describedby="newpassword" value={resetToken} onChange={onChangeToken} placeholder="Enter your new password" style={{ display: "none" }}/>
                            </div>

                            <div className="form-group">
                                <label htmlFor="newpassword" className='col-form-label font-weight-bold'>Password: </label>
                                <input type="password" className="form-control" id="newpassword" aria-describedby="newpassword" placeholder="Enter your new password" autoFocus/>
                            </div>

                            <div className="form-group">
                                <label htmlFor="password" className='col-form-label font-weight-bold'>Confirm Password: </label>
                                <input type="password" name='password' className="form-control" id="password" value={password} onChange={onChangePassword} aria-describedby="email" placeholder="Enter your confirm password"/>
                            </div>
                            
                            <div className="form-group">
                            <button className="btn btn-primary btn-block" disabled={loading}>
                                {loading && (
                                    <span className="spinner-border spinner-border-sm"></span>
                                )}
                                <span>Change Password</span>
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
                        </div>
                    </form>
            </div>
    </div>
  )
}

export default ResetPassword