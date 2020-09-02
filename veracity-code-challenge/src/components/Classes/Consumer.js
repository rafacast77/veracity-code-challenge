/** @format */

class Consumer {
  constructor(type) {
    this.type = type;
    this.payload = [];
  }
  // changes so if type = all and remove the all method
  addPayload(payload) {
    this.payload.push(payload);
  }

  logConsumerData() {
    const logs = []
    for (let p of this.payload) {
      logs.push(`${this.type}, "${p}"`)
    }
    return logs;
  }

  addAll(type, payload){
    this.payload.push(`${type}, "${payload}"`)
  }
}

export default Consumer;
