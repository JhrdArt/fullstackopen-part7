import { useDispatch, useSelector } from "react-redux";
import { addLike, deleteBlog } from "../reducers/blogsReducer";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Comment } from "./Comment";
import { Button } from "@mui/material";

export const Blog = () => {
    const { id } = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const blog = useSelector(state => state.blogs.find(b => b.id === id))
    const user = useSelector(state => state.login)
    console.log("blog: ", blog)
    if (!blog) return null

    const handleDeleteBlog = () => {
        if (window.confirm(`Remove Blog ${blog.title} by ${blog.author}`)) {
            dispatch(deleteBlog(blog))
            navigate("/")
        }
    }

    const handleLike = () => {
        const blogToUpdate = {
            ...blog,
            likes: blog.likes + 1,
            user: blog.user?.id
        };
        dispatch(addLike(blog.id, blogToUpdate))
    }

    return (
        <>

            <div className="blog" >
                <div >
                    <h3 >{blog.title} - {blog.author}</h3>
                    {/* <button id="view-btn" onClick={toggleVisibility}>{visible ? "Hide" : "Show"}</button> */}
                    {/* Si el usuario es el mismo que creó el blog muestra delete */}
                    {
                        blog.user?.name === user?.name && <Button id="delete-btn" color="warning" variant="contained" onClick={handleDeleteBlog} >Delete</Button>
                    }
                </div>

                <div>
                    <div>
                        <p className="author">Author: {blog.author}</p>
                    </div>
                    <div>
                        <a className="url">URL: {blog.url}</a>
                    </div>
                    <div className="likes">
                        <p>Likes: {blog.likes}</p>
                        <Button color="primary" variant="contained" id="like-btn" onClick={handleLike} >Like</Button>
                    </div>
                </div>
                <Comment blog={blog} />

            </div>
        </>
    );
};
