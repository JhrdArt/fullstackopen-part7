import { useState } from 'react'
import { Routes, Route, useMatch } from "react-router-dom"
import { AnecdoteLists } from './components/AnecdoteLists'
import { Menu } from './components/Menu'
import { CreateNew } from './components/CreateNew'
import { Footer } from './components/Footer'
import { About } from './components/about'
import { Anecdote } from './components/Anecdote'
import { Notification } from './components/Notification'
import { useEffect } from 'react'

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: 1
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: 2
    }
  ])

  const [notification, setNotification] = useState(null)

  useEffect(() => {
    const timeout = setTimeout(() => {
      setNotification(null)
    }, 10000);

    return () => clearTimeout(timeout)
  }, [notification, setNotification])


  const addNew = (anecdote) => {
    anecdote.id = Math.round(Math.random() * 10000)
    setAnecdotes([...anecdotes, anecdote])
    setNotification(`New anecdote: "${anecdote.content}" is added:`)
  }

  const anecdoteById = (id) =>
    anecdotes.find(a => a.id === id)

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  }

  const match = useMatch('/anecdotes/:id')
  const anecdote = match ? anecdotes.find(a => a.id === Number(match.params.id)) : null;

  return (
    <>
      <h1>Software anecdotes</h1>

      <Menu />
      <Notification notification={notification} />
      <Routes>
        <Route path='/anecdotes' element={<AnecdoteLists anecdotes={anecdotes} />} />
        <Route path='/anecdotes/:id' element={<Anecdote anecdote={anecdote} />} />
        <Route path='/about' element={<About />} />
        <Route path='/create' element={<CreateNew addNew={addNew} />} />
      </Routes>
      <Footer />

    </>
  )
}

export default App
