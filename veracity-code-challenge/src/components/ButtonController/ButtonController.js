/** @format */

import React from 'react';
import Button from './Button/Button';
import Materialize from 'materialize-css';
import CSVReader1 from './Button/CSVButton';

const ButtonController = (props) => {
  return (
    <div className="row center">
      <div className="col m3  ">
        <CSVReader1 loadFileToState={props.loadFileToState} />
      </div>
      <div className="col m3">
        <Button label="Start" clicked={props.ProcessData} />
      </div>
      <div className="col m3">
        <Button label="Stop" clicked={props.stopsExecution} />
      </div>
      <div className="col m3">
        <Button label="Restart" />
      </div>
      <div className="red lighten-2" style={{ height: '600px' }}></div>
    </div>
  );
};

export default ButtonController;
