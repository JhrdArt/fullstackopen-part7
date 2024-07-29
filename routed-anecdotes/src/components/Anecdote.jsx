import React from 'react'

export const Anecdote = ({ anecdote }) => {

    console.log(anecdote)
    return (
        <div>
            <p>{anecdote?.content} by {anecdote?.author} </p>
            <a href='#'>{anecdote?.info}</a>
        </div>
    )
}
