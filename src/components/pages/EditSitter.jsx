import React, {useState, useEffect} from 'react'
import {useParams, useNavigate} from 'react-router-dom'
import UserServices from '../../services/UserServices';

const EditSitter = () => {
    const {id} = useParams();
    let navigate = useNavigate();

    const initialUserService = {
        id: null,
		contactname: "",
		email: "",
		company: "",
		open: "",
		close: "",
		chargesperhour: ""
    };

    const [currentUser, setCurrentUser] = useState(initialUserService);
    const [message, setMessage] = useState("");

    const getUser = id => {
        UserServices.get(id)
          .then(response => {
            setCurrentUser(response.data);
            console.log(response.data);
          })
          .catch(e => {
            console.log(e);
          });
      };

      useEffect(() => {
        if (id)
        getUser(id);
      }, [id]);

      const handleInputChange = event => {
        const { name, value } = event.target;
        setCurrentUser({ ...currentUser, [name]: value });
      };

    //   const updateUser = () => {
    //     var data = {
    //       id: currentUser.id,
    //       contactname: currentUser.contactname,
    //       email: currentUser.email,
    //       company: currentUser.company,
    //       open: currentUser.open,
    //       close: currentUser.close,
    //       chargesperhour: currentUser.chargesperhour  
    //     };

    //     UserServices.update(currentUser.id, data)
    //     .then(response => {
    //         setCurrentUser({ ...currentUser});
    //       console.log(response.data);
    //     })
    //     .catch(e => {
    //       console.log(e);
    //     });
    // };
  
    const updateUser = () => {
        UserServices.update(currentUser.id, currentUser)
        .then(response => {
            setCurrentUser({ ...currentUser});
          console.log(response.data);
          setMessage("The User was updated successfully!");
        })
        .catch(e => {
          console.log(e);
        });
    };

    const deleteUser = () => {
        UserServices.remove(currentUser.id)
          .then(response => {
            console.log(response.data);
            navigate("/admin/sitterlist");
          })
          .catch(e => {
            console.log(e);
          });
      };
      
  return (
    <div>
    {currentUser ? (
      <div className="edit-form">
        <h4>Edit Sitter</h4>
        <form>
          <div className="form-group">
            <label htmlFor="contactname">Contact Name</label>
            <input
              type="text"
              className="form-control"
              id="contactname"
              name="contactname"
              value={currentUser.contactname}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={currentUser.email}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="company">Company Name</label>
            <input
              type="text"
              className="form-control"
              id="company"
              name="company"
              value={currentUser.company}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="contactname">Open Time</label>
            <input
              type="text"
              className="form-control"
              id="open"
              name="open"
              value={currentUser.open}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="close">Close Time</label>
            <input
              type="text"
              className="form-control"
              id="close"
              name="close"
              value={currentUser.close}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="chargesperhour">Charges Per Hour's</label>
            <input
              type="text"
              className="form-control"
              id="chargesperhour"
              name="chargesperhour"
              value={currentUser.chargesperhour}
              onChange={handleInputChange}
            />
          </div>

        </form>
        <button className="badge badge-danger mr-2" onClick={deleteUser}>
          Delete
        </button>

        <button
          type="submit"
          className="badge badge-success"
          onClick={updateUser}
        >
          Update
        </button>
        <p>{message}</p>
      </div>
    ) : (
      <div>
        <br />
        <p>Please click on a Tutorial...</p>
      </div>
    )}
  </div>
  )
}

export default EditSitter;