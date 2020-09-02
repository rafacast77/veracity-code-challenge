/** @format */

import React from 'react';

const Button = (props) => (
  <button className="btn waves-effect waves-light" onClick={props.clicked}>
    {props.label}
  </button>
);

export default Button;
