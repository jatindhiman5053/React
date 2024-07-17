import { createSlice, nanoid } from "@reduxjs/toolkit";
import axios from "axios";


const initialState = {
  Users: [
    {
      id: 1,
      Name: "Jatin",
      email: "jatin@gmail.com",
      password: "jatin123",
    },
  ],
};

export const UserSlice = createSlice({
  name: "User",
  initialState,
  reducers: {
    addUser: (state, action) => {
      const User = {
        id: nanoid(),
        Name: action.payload.name,
        email: action.payload.email,
        password: action.payload.password,
      };
      state.Users.push(User);
    },
    
    removeUser: (state, action) => {
      state.Users = state.Users.filter((User) => User.id !== action.payload);
    },
    
    updateUser: (state, action) => {
      const {id,Name, email} = action.payload;
      const Users = state.Users.find((user) =>user.id === id);
      axios
        .post("http://localhost:8081/alluser")
        .then((res) => {
        })
        .catch((err) => console.log(err));
      if(Users){
        Users.Name = Name ;
        Users.email = email; 
      }
    },
    
  },
});

export const { addUser, removeUser, updateUser } = UserSlice.actions;

export default UserSlice.reducer;
