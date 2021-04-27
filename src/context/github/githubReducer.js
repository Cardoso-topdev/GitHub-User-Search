import { SEARCH_USERS,SET_LOADING,CLEAR_USERS,GET_REPOS,GET_USER, SET_SEARCH_TEXT } from '../types'

export default (state,action) => {
  switch (action.type) {
    case SEARCH_USERS:
      return {
        ...state,
        users: action.payload.data.items,
        total_count: action.payload.data.total_count,
        search_text: action.payload.searchText,
        loading:false
      }
    case SET_SEARCH_TEXT:
      return {
        ...state,
        search_text: action.payload
      }
    case SET_LOADING:
      return {
        ...state,
        loading: true,
      }
    case CLEAR_USERS:
      return {
        ...state,
        loading: false,
        users:[]
      }
    case GET_USER:
      return {
        ...state,
        user:action.payload,
        loading: false,
      }
    case GET_REPOS:
      return {
        ...state,
        repos:action.payload,
        loading: false,
      }
    default:
      return state;
  }
}