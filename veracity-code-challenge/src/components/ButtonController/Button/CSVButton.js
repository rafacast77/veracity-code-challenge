/** @format */

import React, { Component } from 'react';
import { CSVReader } from 'react-papaparse';

const buttonRef = React.createRef();

export default class CSVReader1 extends Component {
  handleOpenDialog = (e) => {
    // Note that the ref is set async, so it might be null at some point
    if (buttonRef.current) {
      buttonRef.current.open(e);
    }
  };

  handleOnFileLoad = (data) => {
    this.props.loadFileToState(data);
  };

  handleOnError = (err, file, inputElem, reason) => {
    console.log(err);
  };

  handleOnRemoveFile = (data) => {
    console.log('---------------------------');
    console.log(data);
    console.log('---------------------------');
  };

  handleRemoveFile = (e) => {
    // Note that the ref is set async, so it might be null at some point
    if (buttonRef.current) {
      buttonRef.current.removeFile(e);
    }
  };

  render() {
    return (
      <>
        <CSVReader
          ref={buttonRef}
          onFileLoad={this.handleOnFileLoad}
          onError={this.handleOnError}
          noClick
          config={{ header: true }}
          noDrag
          noProgressBar
          onRemoveFile={this.handleOnRemoveFile}
        >
          {({ file }) => (
            <>
              <button
                className="btn waves-effect waves-light"
                onClick={this.handleOpenDialog}
              >
                Upload csv file
              </button>
              <div
                style={{
                  borderWidth: 1,
                  borderColor: '#ccc',
                  height: 45,
                  width: '99%',
                  display: 'in-block',
                }}
              >
                {file && file.name}
              </div>
            </>
          )}
        </CSVReader>
      </>
    );
  }
}
