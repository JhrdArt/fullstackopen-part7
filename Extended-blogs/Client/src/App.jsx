import { useEffect, useState, useRef } from "react";


//redux
import { Login } from "./Components/Login";
import { Blogform } from "./Components/Blogform";
import { Togglable } from "./Components/Togglable";
import { Notification } from "./Components/Notification";
import { useDispatch, useSelector } from "react-redux";
import { initializeBlogs } from "./reducers/blogsReducer";
import { BlogList } from "./Components/BlogList";
import { logoutUser } from "./reducers/loginReducer";
import userServices from "./Services/user.services";
import { initializeUser } from "./reducers/userReducer";
import { login as loggedUser } from "./reducers/loginReducer"
import { Navbar } from "./Components/Navbar";
import { Greeting } from "./Components/Greeting";

//router
import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import { Users } from "./Components/Users";
import { Blog } from "./Components/Blog";

//material
import { Container } from "@mui/material"
import { User } from "./Components/User";

function App() {
  const dispatch = useDispatch()
  const user = useSelector(state => state.login)

  useEffect(() => {
    const userFromStorage = userServices.getUser();
    if (userFromStorage) {
      dispatch(loggedUser(userFromStorage))
    }
  }, []);

  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(initializeUser())
  }, []);
  const blogRef = useRef()



  // const blogFormRef = useRef();

  if (user === null) {
    return (
      <Container>
        <Login />
      </Container>
    )
  }

  return (
    <Container>
      <Navbar />
      <Notification />
      <Greeting user={user} />
      <Togglable buttonLabel="Add new blog" ref={blogRef}>
        <Blogform />
      </Togglable>

      <Routes>
        <Route path="/" element={<Greeting />} />
        <Route path="/users" element={<Users />} />
        <Route path="/users/:id" element={<User />} />
        <Route path="/blogs" element={<BlogList />} />
        <Route path="/blogs/:id" element={<Blog />} />
      </Routes>
    </Container>
  );
}

export default App;
