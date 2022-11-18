import React, {useState, useEffect, useRef} from "react";
import UserServices from "../../services/UserServices";

const  SitterList = () => {
    const [users, setUser] = useState([]);
    const effectRan = useRef(false);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    useEffect(() => {
      if(effectRan.current === false){
        retrieveUser(); 
        return () => {
          effectRan.current = true;
        }
      }       
    }, []);

    const retrieveUser = (e) =>{
      setLoading(true);
        UserServices.getAll()
        .then(response => {
            setUser(response.data);
            setLoading(false);
            setMessage("")
            console.log(response.data);
        })
        .catch( e => {
            console.log(e);
            setLoading(false);
            setMessage("Something went wrong!");
        });
    };

    return (
        <>
        <h4 className="text-center">Sitter Records</h4>	
        {loading && (
        <span className="spinner-border" style={{ position: "fixed", zIndex:"1031", top:"50%", left: "50%", transform: "initial" }}></span>
        )}
       <table className="table" id="myTable"> 
          <thead className="thead-dark">
            <tr>
              <th>S No.</th>
              <th>Company Logo</th>
              <th>Company Name</th>
              <th>Name</th>
              <th>Email</th>
              <th>Address</th>
              <th>Open Time</th>
              <th>Charges</th>
            </tr>
          </thead>
          <tbody> 
          {message && (
            <div className="form-group" style={{ position: "fixed", zIndex:"1031", left: "45%", transform: "initial" }}>
              <div className="alert alert-danger " role="alert">
                {message}
              </div>
            </div>
          )}        
             {users && users.length > 0 && users.map((user, index) => (
                <tr key={user.id}>
                <td>{index + 1}</td>
                <td><img src={user.logo} alt={users.contactname} draggable= "true" style={{height:"50px", width: "50px"}} /></td>
                <td>{user.company}</td>
                <td>{user.contactname}</td>
                <td>{user.email}</td>
                <td>{user.address.substring(0, 30)} ...{" "} {user.address.substr(user.address.length - 20)}</td>
                <td>{user.open}</td>
                <td>{user.chargesperhour}</td>
                </tr>
             ))}
           
          </tbody>
        </table>
      </>
    );
}

export default SitterList;


    