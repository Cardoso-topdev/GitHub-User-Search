import React, {useContext} from 'react'
import alertContext from '../../context/alert/alertContext'

const Alert = () => {
  const context = useContext(alertContext) ;
  return (
    context.alert !== null && (
      <div className={`alert alert-${context.alert.type}`}>
        <i className='fa fa-info-circle'/>  {context.alert.msg}
      </div>
    )
  );
};

export default Alert
