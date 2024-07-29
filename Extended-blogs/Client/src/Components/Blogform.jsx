import { useState } from "react"
import { useField } from "../hooks";
import { createBlog } from "../reducers/blogsReducer";
import { useDispatch } from "react-redux";
import { Button, TextField } from "@mui/material";

export const Blogform = () => {
    // const [newBlog, setNewBlog] = useState({ author: "", title: "", url: "" });
    // console.log(newBlog)

    // const handleInputChange = (e) => {
    //     const { name, value } = e.target;
    //     setNewBlog({ ...newBlog, [name]: value });
    // };
    const { reset: resetAuthor, ...author } = useField("text")
    const { reset: resetTitle, ...title } = useField("text")
    const { reset: resetUrl, ...url } = useField("text")

    const dispatch = useDispatch()


    const handleCreate = (e) => {
        e.preventDefault();
        const newBlog = {
            author: author.value,
            title: title.value,
            url: url.value
        }
        dispatch(createBlog(newBlog));
        resetAuthor()
        resetTitle()
        resetUrl()
    };


    return (
        <>
            <h2 >Create a new blog</h2>
            <form className="blog-form" style={{ display: "flex", gap: ".625rem", marginBottom: "1.25rem" }} onSubmit={handleCreate}  >
                <div >
                    <TextField label="author" placeholder="author" name="author" {...author} />
                </div>
                <div >

                    <TextField label="title" placeholder="title" name="title" {...title} />
                </div>
                <div className="flex gap-2 justify-between">

                    <TextField label="url" placeholder="url" name="url" {...url} />
                </div>
                <Button variant="contained" color="primary" type="submit">Create</Button>

            </form>
        </>
    )
}
