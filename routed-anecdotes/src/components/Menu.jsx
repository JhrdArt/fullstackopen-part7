import { Link, BrowserRouter as Router } from "react-router-dom"
export const Menu = () => {
    const padding = {
        paddingRight: 7
    }
    return (
        <div>
            <Link to='/create' style={padding}>create new</Link>
            <Link to='/anecdotes' style={padding}>anecdotes</Link>
            <Link to='/about' style={padding}>about</Link>
        </div>

    )
}