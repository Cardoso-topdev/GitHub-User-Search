import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import Avatar from '@material-ui/core/Avatar'
import Card from '@material-ui/core/Card'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import CardContent from '@material-ui/core/CardContent';
import styled from "styled-components/macro"
import { Container } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: "20px",
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
}));

const StyledCardContent = styled(CardContent)`
  display:flex;
  justify-content: space-around;
  width: 100%;
  align-items: center;
`

const CenteredAvatar = styled(Avatar)`
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  margin-bottom: 20px;
`

const StyledContainer = styled(Container)`
  text-align: center;
`
const DetailContainer = styled.div`
`

const UserItem = (props) => {
  const classes = useStyles();
  const { login, avatar_url, html_url } = props.user
  console.log("USER PROPS: ", props)
  return (
    <Card className={classes.root} variant="outlined">
      <StyledCardContent>
          <Avatar alt="Remy Sharp" src={avatar_url} className={classes.large} />
          <Typography color="textSecondary" gutterBottom>
            {login}
          </Typography>
          <Link to={`user/${login}`}>
            <Button size="small" variant="contained" color="primary" >View Detail</Button>
          </Link>
      </StyledCardContent>
    </Card>
  )
}

UserItem.propTypes = {
  user: PropTypes.object.isRequired,
}
export default UserItem
