import { useDispatch } from "react-redux";
import { useField } from "../hooks";
import { loginUser } from "../reducers/loginReducer";
import { Button, Container, TextField } from "@mui/material";

export const Login = () => {
    const { reset: resetUsername, ...username } = useField("text")
    const { reset: resetPassword, ...password } = useField("password")

    const dispatch = useDispatch()

    const handleLogin = (e) => {
        e.preventDefault()
        const credentials = {
            username: username.value,
            password: password.value
        }
        dispatch(loginUser(credentials))
        resetPassword()
        resetUsername()
    }

    return (
        <Container                                                          >
            <h2>Make your blogs real</h2>
            <form style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", gap: "1.25rem" }} onSubmit={handleLogin}>
                <div className="flex gap-2">
                    <TextField label="Username" id="username" className="pl-1 outline outline-slate-900" placeholder="username" {...username} />
                </div>
                <div className="flex gap-2">
                    <TextField label="Password" id="password" className="pl-1 outline outline-slate-900" placeholder="password" {...password} />
                </div>
                <Button variant="contained" id="login-btn" type="submit" className="bg-slate-600 text-white px-2">Login</Button>
                <span className="text-red-600 underline underline-offset-2 decoration-red-950 p-1">
                </span>
            </form>
        </Container>

    );
};

// Login.propTypes = {
//     username: PropTypes.string.isRequired,
//     password: PropTypes.string.isRequired,
//     setPassword: PropTypes.func.isRequired,
//     setUsername: PropTypes.func.isRequired,
//     handleLogin: PropTypes.func.isRequired
// }