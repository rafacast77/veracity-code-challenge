/** @format */

import React, { Component } from 'react';
import Materialize from 'materialize-css';
import ConsumerComponent from '../components/Consumer/ConsumerComponent';
import ButtonController from '../components/ButtonController/ButtonController';
import Priority from '../components/ButtonController/Button/Priority';
import Producer from '../components/Classes/Producer';
import Consumer from '../components/Classes/Consumer';
/*
//TODO The state that holds the file and the state which hold results should be different. This is so that every time you run it you clean the state and print from scratch instead of adding to the previous state.
// TODO Work on the priority button
// Simplify the code #Design from scratch using the answer as reference
// No need restart button you can name start run and every time you run runs a new one.
// TODO change restart so that it download console file.
// TODO Add unit testing to one of the consumers (check how to uni test in react)
// TODO Document code of needed
// TODO Upload to github and add documentation in read me
*/
export class MainApp extends Component {
  state = {
    queue: [],
    togglePriority: false,
    file: [],
    console: [],
    all: [],
  };

  loadFileToState = (data) => {
    const newQueue = new Producer().createObjectList(data);
    this.setState((prevState) => {
      return {
        queue: newQueue,
      };
    });
  };

  processDataHandler = async () => {
    const mutableQueue = [...this.state.queue];
    const producer = new Producer();
    // Producer returns a priority queue
    producer.priorityQueue(mutableQueue);

    // Consumer creation
    const consumerFile = new Consumer('File');
    const consumerConsole = new Consumer('Console');
    const consumerAll = new Consumer('all');
    let count = 0;
    let tempLoop = [];
    // Consumer processing and distribution
    // use asyn await or promise so that you process only 10 items per second
    for (let queueElement of producer.collection) {
      if (count === 10) {
        for (const queueElement of tempLoop) {
          if (queueElement.type === consumerFile.type) {
            consumerFile.addPayload(queueElement.payload);
            const mutableFile = this.state.file;
            mutableFile.push(`${queueElement.type}, "${queueElement.payload}"`);
            this.setState({
              file: mutableFile,
            });
          } else if (queueElement.type === consumerConsole.type) {
            consumerConsole.addPayload(queueElement.payload);
            const mutableConsole = this.state.console;
            mutableConsole.push(
              `${queueElement.type}, "${queueElement.payload}"`
            );
            this.setState({
              console: mutableConsole,
            });
          }
          consumerAll.addAll(queueElement.type, queueElement.payload);
          const mutableAll = this.state.all;
          mutableAll.push(`${queueElement.type}, "${queueElement.payload}"`);
          this.setState({
            all: mutableAll,
          });
        }
        tempLoop = [];
        count = 0;
        await Producer.timer(1000);
      }

      tempLoop.push(queueElement);
      count++;
    }
  };
  // This should only handle true or false and not add priority. because if there is no file and you turn it on or off it won't process it below. Think how you can move the adding of priority to another method. 
  priorityChangeHandler = () => {
    const topPriority = 'File';

    // Changes priority state
    this.setState((prevState) => {
      return { togglePriority: !prevState.togglePriority };
    });

    // Priority off File
    if (this.state.togglePriority) {
      this.setState((prevState) => {
        const mutableQueue = [...prevState.queue];
        for (let element of mutableQueue) {
          if (element.type === topPriority) element.priority = 1;
        }
        return {
          queue: mutableQueue,
        };
      });
    } else {
      // Priority On File
      this.setState((prevState) => {
        const mutableQueue = [...prevState.queue];
        mutableQueue.map((element) => {
          if (element.type === topPriority) {
            element.priority = 2;
          }
        });
        return {
          queue: mutableQueue,
        };
      });
    }
  };

  stopsExecutionHandler = () => {
    console.log('Stop');
  };
  render() {
    return (
      <>
        <div className="row ">
          <div className="row">
            <div className="col m4">
              <ConsumerComponent name="File" payload={this.state.file}>
                <Priority
                  priorityChange={this.priorityChangeHandler}
                ></Priority>
              </ConsumerComponent>
            </div>
            <div className="col m4">
              <ConsumerComponent name="Console" payload={this.state.console} />
            </div>
            <div className="col m4">
              <ConsumerComponent name="All" payload={this.state.all} />
            </div>
            <ButtonController
              loadFileToState={this.loadFileToState}
              ProcessData={this.processDataHandler}
              stopsExecution={this.stopsExecutionHandler}
            />
          </div>
        </div>
      </>
    );
  }
}

export default MainApp;
