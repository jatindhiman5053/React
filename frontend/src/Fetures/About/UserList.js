import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeUser, updateUser } from "../../Reducer/reducer";
import axios from "axios";
import "./UserList.css";

function UserList() {
  const users = useSelector((state) => state.Users);
  const dispatch = useDispatch();

  const [Alluser, setAlluser] = useState([]);

  useEffect(() => {
    axios
      .post("http://localhost:8081/alluser")
      .then((res) => {
        setAlluser(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleEditClick = (userId) => {
    const newName = window.prompt("Enter new name:");
    if (newName) {
      const updatedUser = { id: userId, name: newName };
      axios
        .post("http://localhost:8081/edituser", updatedUser)
        .then((res) => {
          setAlluser((prevUsers) =>
            prevUsers.map((user) =>
              user.id === userId ? { ...user, name: newName } : user
            )
          );
          dispatch(updateUser(updatedUser));
        })
        .catch((err) => console.log(err));
    }
  };
  
const handledeleteClick = (userId) => {
  if (userId) {
    axios
      .post("http://localhost:8081/deleteuser", { id: userId })
      .then((res) => {
        setAlluser((prevUsers) =>
          prevUsers.filter((user) => user.id !== userId)
        );
        dispatch(removeUser({ id: userId }));
      })
      .catch((err) => console.log(err));
  }
};


  return (
    <>
      <div className="d-flex justify-content-center align-items-center mt-5 pt-5">
        <div className="p-3 rounded w-50 border border-1">
          <ul className="list-none d-flex gap-3 flex-column">
            {Alluser.map((user) => (
              <li
                className="d-flex gap-3 p-1 justify-content-center align-items-center border border-1"
                key={user.id}
              >
                <div>{user.name}</div>
                <div>{user.email}</div>
                <button
                  className="btn btn-success button"
                  onClick={() => handleEditClick(user.id)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger button"
                  onClick={() => handledeleteClick(user.id)}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export default UserList;
