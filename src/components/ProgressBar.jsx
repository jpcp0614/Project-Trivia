import React, { Component } from 'react';

export default class ProgressBar extends Component {
  constructor() {
    super();

    this.state = {
      timeOut: false,
    };

    this.startTimer = this.startTimer.bind(this);
  }

  startTimer() {
    const TOTAL_TIME = 31;
    const INTERVAL = 1000;
    let timer = TOTAL_TIME;
    setInterval(() => {
      if (timer === 0) {
        return;
      }
      timer -= 1;

      document.getElementById('counter').innerText = timer;
      document.getElementById('progressBar').value = timer;
    }, INTERVAL);
  }

  render() {
    this.startTimer();
    return (
      <div>
        <span id="counter" />
        <progress value="0" max="30" id="progressBar" />
      </div>
    );
  }
}
