import React, {useContext} from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import InputBase from '@material-ui/core/InputBase'
import MenuIcon from '@material-ui/icons/Menu'
import SearchIcon from '@material-ui/icons/Search'
import { Link } from 'react-router-dom'
import githubContext from '../../context/github/githubContext'
import {useStyles} from "./styles"
import { withRouter } from 'react-router'

const SearchAppBar = (props) => {
  const classes = useStyles()
  const gc = useContext(githubContext)

  console.log("PROPS: ", props)
  const searchEnterPress = (e) =>{
    if((e.keyCode == 13) && (e.target.value !== "")){
      gc.setSearchText(e.target.value)
      props.history.push("/")
    }
  }  

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
          >
            <MenuIcon />
          </IconButton>
          <Typography className={classes.title} variant="h6" noWrap>
            <Link to="/">
              GitHub User Search
            </Link>
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
              onKeyDown={searchEnterPress} 
            />
          </div>
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default withRouter(SearchAppBar)