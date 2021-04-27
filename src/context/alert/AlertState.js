import React, {useReducer} from 'react'
import alertContext from './alertContext'
import alertReducer from './alertReducer'

import { SET_ALERT } from '../types'

const AlertState = props => {
  const initialState = {
    alert:null
  }

  const showAlert = (msg, cls) => {
    setAlert({msg, cls});
    setTimeout(() => {setAlert(null)}, 2000);
  };

  const setAlert = (msg, cls) =>{
    dispatch({type:SET_ALERT,payload:{msg, cls}});
  }


  const [state, dispatch] = useReducer(alertReducer, initialState);
 
  return <alertContext.Provider 
    value={
      {
        alert:state.alert,
        showAlert,
        setAlert
      }
    }
  >
  {props.children}
  </alertContext.Provider>
}

export default AlertState;