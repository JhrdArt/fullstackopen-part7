import { Alert } from "@mui/material"
import { useSelector } from "react-redux"

export const Notification = () => {
    const notification = useSelector(state => {
        console.log('state: ', state)
        return state.notification
    })
    console.log("notification", notification)

    if (notification === null) return null

    const style = {
        padding: "1rem",
        marginTop: "2rem"
    }

    return (
        <Alert severity={notification.type} style={style}>{notification && notification.message}</Alert>
    )
}
