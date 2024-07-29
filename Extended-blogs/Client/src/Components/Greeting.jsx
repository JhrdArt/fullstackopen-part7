import React from 'react'

export const Greeting = ({ user }) => {

    return (
        <>
        <h3>¡Hello! {user?.name} 😀</h3>
        </>
    )
}
