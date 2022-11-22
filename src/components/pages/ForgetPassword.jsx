import React, { useRef } from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import AuthService from '../../services/auth.service';

function ForgetPassword() {

    let navigate = useNavigate();
    const form = useRef();
    const checkBtn = useRef();

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [email , setEmail] = useState("");

    const onChangeEmail = (e) => {
        const email = e.target.value;
        setEmail(email);
      };    

      const handleForgetPassword = (e) =>{
        e.preventDefault();
         setMessage("");
         setLoading(true);

        AuthService.fogetPassword(email).then(
            () => {
              navigate("/forgetpassword");
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
				  <div className="card-header alert-danger text-center h3">
				  <h2>Forgot Password</h2>
				  </div>
                  <form onSubmit={handleForgetPassword} ref={form}>
                    <div className="card-body">
                            <div className="form-group">
                                <label htmlFor="email" className='col-form-label font-weight-bold'>Email address: </label>
                                <input type="email" name='email' className="form-control" id="email" value={email} onChange={onChangeEmail} aria-describedby="email" placeholder="Enter your email address" autoFocus/>
                                <small id="emailHelp" className="form-text text-muted">We will be sending a reset password link to your email.</small>
                            </div>
                            
                            <div className="form-group">
                            <button className="btn btn-primary btn-block" disabled={loading}>
                                {loading && (
                                    <span className="spinner-border spinner-border-sm"></span>
                                )}
                                <span> Send</span>
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

export default ForgetPassword