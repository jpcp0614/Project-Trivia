import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class ProgressBar extends Component {
  componentDidMount() {
    this.startTimer();
  }

  startTimer() {
    const { disableAnswers } = this.props;
    const TOTAL_TIME = 31;
    const INTERVAL = 1000;
    let timer = TOTAL_TIME;
    const countDown = setInterval(() => {
      if (timer === 0) {
        clearInterval(countDown);
        return;
      }

      if (timer === 1) {
        disableAnswers();
      }

      timer -= 1;

      if (document.getElementById('counter')) {
        document.getElementById('counter').innerText = timer;
      }
      if (document.getElementById('progressBar')) {
        document.getElementById('progressBar').value = timer;
      }
    }, INTERVAL);
  }

  render() {
    return (
      <div>
        <span id="counter" />
        <progress value="0" max="30" id="progressBar" />
      </div>
    );
  }
}

ProgressBar.propTypes = {
  disableAnswers: PropTypes.func.isRequired,
};
