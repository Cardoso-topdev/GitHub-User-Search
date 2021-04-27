import React, {useState, useContext} from 'react'
import githubContext from '../../context/github/githubContext'
import alertContext from '../../context/alert/alertContext'

const Search = () => {

  const [text, setText] = useState('');
  
  const gc = useContext(githubContext);
  const ac = useContext(alertContext);

  const onChange = e => {
    setText(e.target.value);
  }
  
  const onSubmit = (e) => {
    e.preventDefault();
    if(text === ''){
      ac.setAlert('Please Enter Something', 'info');
      return;
    }
    gc.searchUsers(text);
    setText('');
    
  }
    
    return (
      <div>
        <form onSubmit={onSubmit}>
          <div className="form">
            <input type="text" name="text" placeholder="Search Users..." value={text} onChange={onChange}/>
            <input type="submit" value="Search" className="btn btn-dark btn-block"/>
          </div>
        </form>
        {gc.users.length >0 && <button className="btn btn-warnning btn-block" onClick={gc.userClear}>Clear</button>}
      </div>
    )
  
}


export default Search
