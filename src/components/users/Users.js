import React, { useState, useEffect, useContext } from 'react'
import UserItem from './UserItem'
import Spinner from '../layout/Spinner'
import githubContext from '../../context/github/githubContext'
import styled from "styled-components/macro"
import TablePagination from '@material-ui/core/TablePagination';

const userStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gridGap: '1rem'
}

const StyledPagination = styled(TablePagination)`
  margin: 30px;
  ul{
    justify-content:center
  }
`

const Users = () => {

  const gc = useContext(githubContext)
  const [currentPage, setCurrentPage] = useState(1)
  const [perPage, setPerPage] = useState(10)

  const { loading, users, searchText, totalCount } = gc

  useEffect( () => {
    if ( searchText !== undefined) 
      gc.searchUsers(searchText, 1, perPage)
  }, [searchText])

  const handleChange = (event, value) => {
    if ( searchText !== undefined){
      console.log("Changed")
      gc.searchUsers(searchText, (value + 1), perPage)
      setCurrentPage(value + 1)
    }
  }

  const handleChangeRowsPerPage = (event) => {
    setPerPage(parseInt(event.target.value, 10));
    if ( searchText !== undefined){
      console.log("Changed")
      gc.searchUsers(searchText, 1, event.target.value)
      setCurrentPage(1)
    }
  }

  if (loading) {
    return <Spinner />
  }
  else {
    return (
      <>
        <StyledPagination
          component="div"
          count={totalCount? totalCount : 0}
          page={currentPage - 1}
          onChangePage={handleChange}
          rowsPerPage={perPage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
          color="primary" />
        <div >
          {
            users.map(user => (
              <UserItem key={user.id} user={user} />
            ))
          }
        </div>
      </>
    )
  }
}

export default Users

