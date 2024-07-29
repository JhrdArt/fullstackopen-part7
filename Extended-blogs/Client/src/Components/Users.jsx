import React from 'react'
import { useSelector } from 'react-redux'

import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    Paper
} from "@mui/material"
import { Link } from 'react-router-dom'
import { User } from './User'

export const Users = () => {
    const users = useSelector(state => state.users)

    console.log(users)
    return (
        <>
            <h1>Users</h1>

            {
                users?.map(user => (
                    <TableContainer key={user.id}>
                        <Table>
                            <TableBody>
                                <TableRow>
                                    <TableCell>
                                        <Link to={`/users/${user.id}`}>{user.name}</Link>
                                    </TableCell>
                                    <TableCell align='right'>
                                        {user.blogs.length}
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                ))
            }
        </>
    )
}
