import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';
import ProgressBar from '../components/ProgressBar';
import '../assets/css/triviaScreen.css';

class TriviaScreen extends Component {
  constructor() {
    super();

    this.state = {
      triviaQuestions: [],
      answers: [],
      questionSelector: 0,
      isFilled: false,
      answersDisabled: false,
      assertions: 0,
      score: 0,
    };

    this.fetchTriviaApi = this.fetchTriviaApi.bind(this);
    this.checkQuestions = this.checkQuestions.bind(this);
    this.disableAnswers = this.disableAnswers.bind(this);
    this.changeDisabledBtn = this.changeDisabledBtn.bind(this);
    this.incorrectOrCorrect = this.incorrectOrCorrect.bind(this);
    this.setPlayerInfo = this.setPlayerInfo.bind(this);
  }

  componentDidMount() {
    this.fetchTriviaApi();
    this.setInitialPlayer();
  }

  componentDidUpdate(_prevProps, prevState) {
    const { triviaQuestions, answersDisabled, assertions } = this.state;

    if (prevState.triviaQuestions.length !== triviaQuestions.length) {
      this.checkQuestions();
    }

    if (prevState.answersDisabled !== answersDisabled) {
      this.changeDisabledBtn();
    }

    if (prevState.assertions !== assertions) {
      this.setPlayerInfo();
    }
  }

  setInitialPlayer() {
    const state = {
      player: {
        name: '',
        assertions: 0,
        score: 0,
        gravatarEmail: '',
      },
    };
    localStorage.setItem('state', JSON.stringify(state));
  }

  setPlayerInfo() {
    const { assertions, score } = this.state;
    const { name, email } = this.props;
    console.log(name, email);
    const state = {
      player: {
        name,
        assertions,
        score,
        gravatarEmail: email,
      },
    };
    localStorage.setItem('state', JSON.stringify(state));
  }

  async fetchTriviaApi() {
    const token = JSON.parse(localStorage.getItem('token'));
    const endpoint = `https://opentdb.com/api.php?amount=5&token=${token}`;
    try {
      const response = await fetch(endpoint);
      const { results } = await response.json();
      this.setState({
        triviaQuestions: results,
      });
    } catch (error) {
      console.error(error);
    }
  }

  checkQuestions() {
    const { triviaQuestions } = this.state;
    const checkTriviaLenght = triviaQuestions.length !== 0;

    if (checkTriviaLenght) {
      this.setState({ isFilled: true });
      this.generateAswers(true);
    }
  }

  // Função tirada do link https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
  shuffleAswers(array) {
    let currentIndex = array.length;
    let randomIndex = 0;

    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }

    return array;
  }

  handleAnswerClick(event) {
    const wrongs = document.querySelectorAll('.wrong');
    const correct = document.querySelector('.correct');
    correct.classList.add('correct-answer');
    wrongs.forEach((wrong) => wrong.classList.add('wrong-answer'));
    this.incorrectOrCorrect(event);
  }

  incorrectOrCorrect({ target: { className } }) {
    const NUMBER_TEN = 10;
    const { triviaQuestions, questionSelector } = this.state;
    const { difficulty } = triviaQuestions[questionSelector];
    const timeLeft = Number(document.getElementById('counter').innerText);

    const valueDifficulty = {
      easy: 1,
      medium: 2,
      hard: 3,
    };

    const correctAnswerValue = NUMBER_TEN + (timeLeft * valueDifficulty[difficulty]);

    if (className.includes('correct answer')) {
      this.setState((prevState) => ({
        assertions: prevState.assertions + 1,
        score: prevState.score + correctAnswerValue,
      }));
    }
  }

  generateAswers(checker) {
    const { questionSelector, triviaQuestions } = this.state;
    const triviaSelected = triviaQuestions[questionSelector];
    const falseAnswers = checker && triviaSelected.incorrect_answers
      .map((answer, index) => (
        <button
          className="wrong answer"
          data-testid={ `wrong-answer-${index}` }
          key={ `wrong-answer-${index + 1}` }
          onClick={ (event) => this.handleAnswerClick(event) }
          type="button"
        >
          {answer}
        </button>
      ));

    const questionsAnswers = checker && [
      <button
        className="correct answer"
        data-testid="correct-answer"
        key="correct-answer"
        onClick={ (event) => this.handleAnswerClick(event) }
        type="button"
      >
        {triviaSelected.correct_answer}
      </button>,
      ...falseAnswers,
    ];

    const randomAnswer = this.shuffleAswers(questionsAnswers);

    this.setState({ answers: randomAnswer });
  }

  disableAnswers() {
    this.setState({ answersDisabled: true });
  }

  changeDisabledBtn() {
    const allBtns = [...document.querySelectorAll('.answer')];
    allBtns.forEach((btn) => btn.setAttribute('disabled', 'disabled'));
  }

  render() {
    const { isFilled, questionSelector, triviaQuestions, answers } = this.state;
    const triviaSelected = triviaQuestions[questionSelector];

    return (
      <div>
        <Header />
        <div className="game-section">
          <div className="question-section">
            <header>
              {isFilled
                  && <h3 data-testid="question-category">{triviaSelected.category}</h3>}
            </header>
            {isFilled
                && <p data-testid="question-text">{triviaSelected.question}</p>}
          </div>
          <div className="answers-section" />
          {isFilled
            && answers.map((answer) => answer)}

          <ProgressBar
            disableAnswers={ this.disableAnswers }
          />
        </div>
      </div>
    );
  }
}

TriviaScreen.propTypes = {
  email: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  name: state.login.name,
  email: state.login.email,
});

export default connect(mapStateToProps)(TriviaScreen);
