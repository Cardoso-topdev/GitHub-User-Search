import React, {useReducer} from 'react'
import axios from 'axios'
import githubContext from './githubContext'
import githubReducer from './githubReducer'
import { SEARCH_USERS,SET_LOADING,CLEAR_USERS,GET_REPOS,GET_USER, SET_SEARCH_TEXT } from '../types'

let githubClientId;
let githubClientSecret;

if(process.env.NODE_ENV !== 'production'){
  githubClientId = process.env.REACT_APP_GITHUB_CLIENT_ID;
  githubClientSecret = process.env.REACT_APP_GITHUB_CLIENT_SECRET;
}else {
  githubClientId = process.env.GITHUB_CLIENT_ID;
  githubClientSecret = process.env.GITHUB_CLIENT_SECRET;
}

const GithubState = props => {
  const initialState = {
    users:[],
    user:{},
    repos:[],
    loading:false
  }

  const [state, dispatch] = useReducer(githubReducer, initialState);

  // Search User
  const searchUsers = async (text, pageNum, perPage) => {
    setLoading();
    const res = await axios.get(
      `https://api.github.com/search/users?q=${text}&page=${pageNum}&per_page=${perPage}`
      // `https://api.github.com/search/users?q=${text}&client_id=${githubClientId}&client_secret=${githubClientSecret}`
    );

    dispatch({
      type: SEARCH_USERS,
      payload: {
        data: res.data,
        searchText: text
      }
    });
  };

  // Set Search Text
  const setSearchText = text => {
    dispatch({
      type: SET_SEARCH_TEXT,
      payload: text
    })
  }

  // Get USer
  const getUser = async userName => {
    setLoading();
    const res = await axios.get(
      `https://api.github.com/users/${userName}?client_id=${githubClientId}&client_secret=${githubClientSecret}`
    );
    dispatch({type:GET_USER, payload:res.data});
  };

  // Get Repos
  const getUserRepos = async userName => {
    setLoading();
    const res = await axios.get(
      `https://api.github.com/users/${userName}/repos?per_page=5&sort=created:asc&client_id=${githubClientId}&client_secret=${githubClientSecret}`
    );

    dispatch({
      type:GET_REPOS,
      payload:res.data,
    });
  };


  // Clear Users
  const userClear = () => dispatch({type:CLEAR_USERS});

  // Set Loading
  const setLoading = () => dispatch({type:SET_LOADING})

  return <githubContext.Provider 
    value={
      {
        users: state.users,
        user: state.user,
        repos:state.repos,
        loading: state.loading,
        searchText: state.search_text,
        totalCount: state.total_count,
        setSearchText,
        searchUsers,
        userClear,
        getUser,
        getUserRepos
      }
    }
  >
  {props.children}
  </githubContext.Provider>
}


export default GithubState;