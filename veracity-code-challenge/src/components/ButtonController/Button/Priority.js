/** @format */

import React from 'react';

const Priority = (props) => {

  return(
    <div className="switch" style={{float:'right'}}>
      <label>
        Off
        <input type="checkbox" onChange={props.priorityChange}></input>
        <span className="lever"></span>
        Priority
      </label>
    </div>
  )
}

export default Priority;
