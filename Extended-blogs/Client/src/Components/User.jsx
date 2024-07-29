import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

export const User = () => {
    const { id } = useParams()
    const user = useSelector(state => state.users?.find(user => user.id === id))

    return (
        <>
            <h2>{user?.name}</h2>
            {
                user?.blogs.length > 0 ? (
                    <div>
                        <p><em>Added Blog</em></p>
                        <ul>
                            {
                                user?.blogs.map(blog => <li style={{listStyle:"none"}} key={blog.id}>{blog.title}</li>)
                            }
                        </ul>
                    </div>
                ) : (
                    <p>no blogs yet... 😥</p>
                )
            }
        </>
    )
}

