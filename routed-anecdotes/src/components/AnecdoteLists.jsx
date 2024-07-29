import React from 'react'
import { Link, useParams } from "react-router-dom"


export const AnecdoteLists = ({ anecdotes }) => {

    return (
        <div>
            <h2>Anecdotes</h2>
            <ul>
                {anecdotes.map(anecdote => <li key={anecdote.id} ><Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link></li>)}
            </ul>
        </div>

    )
}
