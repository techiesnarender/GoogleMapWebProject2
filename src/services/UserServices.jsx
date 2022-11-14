import http from "../http-common";
import authHeader from "./auth-header";

const getAll = () => {
  return http.get("/users", { headers: authHeader() });

};
 // return http.get("/admin/users", { headers: authHeader() });
const get = id => {
  return http.get(`/users/${id}`);
};

const create = data => {
  console.log(data)
  return http.post("/users", data);
};

const update = (id, data) => {
  return http.put(`/users/${id}`, data);
};

const remove = id => {
  return http.delete(`/users/${id}`);
};

const findNearestLocation = (address, latitude, longitude) => {
  return http.get(`/users/search?address=${address}&latitude=${latitude}&longitude=${longitude}`);
}

const UserServices =  {
  getAll,
  get,
  create,
  update,
  remove,
  findNearestLocation
};

export default  UserServices;