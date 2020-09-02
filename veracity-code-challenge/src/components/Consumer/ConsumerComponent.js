/** @format */

import React from 'react';
import classes from './Consumer.module.css';
const ConsumerComponent = (props) => {
  const payloads = props.payload;
  const list_LI = payloads.map((payload, index) => {
    return <li key={payload + index}>{payload}</li>;
  });
  return (
    <div className="row">
      <div className="col s12">
        <div className="card">
          <div className="card-content">
            {props.children}
            <span className="card-title center">
              <strong>{props.name}</strong>
            </span>
            <div className={classes.ConsumerList}>
              <ul>{list_LI}</ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ConsumerComponent;
