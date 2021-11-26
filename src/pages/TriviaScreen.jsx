import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';
import ProgressBar from '../components/ProgressBar';
import setInitialPlayer from '../helpers/setInitialPlayer';
import setPlayerInfoFunc from '../helpers/setPlayerInfo';
import fetchTriviaApiFunc from '../helpers/fetchTriviaApi';
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
    this.fetchTriviaApi = fetchTriviaApiFunc.bind(this);
    this.checkQuestions = this.checkQuestions.bind(this);
    this.disableAnswers = this.disableAnswers.bind(this);
    this.changeDisabledBtn = this.changeDisabledBtn.bind(this);
    this.incorrectOrCorrect = this.incorrectOrCorrect.bind(this);
    this.setPlayerInfo = setPlayerInfoFunc.bind(this);
    this.handleBtnNxt = this.handleBtnNxt.bind(this);
  }

  componentDidMount() {
    this.fetchTriviaApi();
    setInitialPlayer();
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

  // async fetchTriviaApi() {
  //   const token = JSON.parse(localStorage.getItem('token'));
  //   const endpoint = `https://opentdb.com/api.php?amount=5&token=${token}`;
  //   try {
  //     const response = await fetch(endpoint);
  //     const { results } = await response.json();
  //     this.setState({
  //       triviaQuestions: results,
  //     });
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }

  checkQuestions() {
    const { triviaQuestions } = this.state;
    const checkTriviaLength = triviaQuestions.length !== 0;

    if (checkTriviaLength) {
      this.setState({ isFilled: true });
      this.generateAnswers(true);
    }
  }

  // Função tirada do link https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
  shuffleAnswers(array) {
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
    const btnNext = document.querySelector('.btn-next');
    btnNext.removeAttribute('hidden');
    correct.classList.add('correct-answer');
    wrongs.forEach((wrong) => wrong.classList.add('wrong-answer'));
    this.incorrectOrCorrect(event);
  }

  handleBtnNxt() {
    const { questionSelector } = this.state;
    this.setState({
      questionSelector: questionSelector + 1,
    });
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

  generateAnswers(checker) {
    const { triviaQuestions } = this.state;
    const triviaAnswers = [];
    triviaQuestions.forEach((triviaSelected) => {
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

      const randomAnswer = this.shuffleAnswers(questionsAnswers);
      triviaAnswers.push(randomAnswer);
    });
    this.setState({ answers: triviaAnswers });
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
    const answerSelected = answers[questionSelector];
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
            && answerSelected.map((answer) => answer)}

          <ProgressBar
            disableAnswers={ this.disableAnswers }
          />
          <button
            className="btn-next"
            data-testid="btn-next"
            hidden="true"
            type="button"
            onClick={ this.handleBtnNxt }
          >
            Próxima
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  name: state.login.name,
  email: state.login.email,
});

export default connect(mapStateToProps)(TriviaScreen);
