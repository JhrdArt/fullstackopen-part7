import React from 'react'
import { Blog } from './Blog'
import { useSelector } from 'react-redux'
import orderBy from "lodash/orderBy"
import { Link } from 'react-router-dom'
import { Paper, Table, TableBody, TableCell, TableContainer, TableRow } from '@mui/material'

export const BlogList = () => {
    const blogs = useSelector(state => state.blogs)
    const blogsSorted = orderBy(blogs, ["likes"], ["desc"])
    return (
        <>
            <h1 >Lista de blogs</h1>
            <TableContainer component={Paper}>
                <Table>
                    <TableBody>
                        {
                            blogsSorted.map(blog => (
                                <TableRow  key={blog.id}>
                                    <TableCell>
                                        <Link to={`/blogs/${blog.id}`}>
                                            {blog.title} - {blog.author}
                                        </Link>
                                    </TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>
            </TableContainer>

        </>
    )
}
