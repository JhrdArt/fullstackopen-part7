import React from 'react'

export const Notification = ({ notification }) => {
    const style = {
        border: "1px",
        color: "#0900ff"
    }

    return (
        <div style={style} >{notification}</div>
    )
}
