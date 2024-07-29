import { useDispatch } from "react-redux"
import { useField } from "../hooks"
import { commentBlog } from "../reducers/blogsReducer"
import { Button, TextField, Grid } from "@mui/material"

export const Comment = ({ blog }) => {
    const { reset: commentReset, ...comment } = useField()
    const dispatch = useDispatch()
    console.log(comment)

    const { id, comments } = blog
    console.log("comments", comments)
    console.log("id:", id)

    const handleComment = (e) => {
        e.preventDefault()
        if (!comment.value.trim()) return ""
        dispatch(commentBlog(id, comment.value.trim()))
        commentReset()
    }

    return (
        <>
            <h2>Comments</h2>
            <form onSubmit={handleComment}>
                <Grid container>
                    <Grid item>
                        <TextField label="Write your comment" size="small" {...comment} />
                    </Grid>
                    <Grid item alignItems="stretch" style={{ display: "flex" }} >
                        <Button variant="contained" color="primary" type="submit" >
                            Add comment
                        </Button>
                    </Grid>
                </Grid>
            </form>
            {
                comments?.length > 0 ? (
                    <ul>
                        {comments.map((comment, i) => <li key={i}>{comment}</li>)}
                    </ul>
                ) : (<p>no comment yet... 😥</p>
                )
            }
        </>
    )
}
