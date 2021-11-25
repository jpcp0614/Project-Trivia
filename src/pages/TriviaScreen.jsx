import React, { Component } from 'react';
import Header from '../components/Header';
import ProgressBar from '../components/ProgressBar';
import '../assets/css/triviaScreen.css';

export default class TriviaScreen extends Component {
  constructor() {
    super();

    this.state = {
      triviaQuestions: [],
      answers: [],
      questionSelector: 0,
      isFilled: false,
      answersDisabled: false,
    };

    this.fetchTriviaApi = this.fetchTriviaApi.bind(this);
    this.checkQuestions = this.checkQuestions.bind(this);
    this.disableAnswers = this.disableAnswers.bind(this);
    this.changeDisabledBtn = this.changeDisabledBtn.bind(this);
  }

  componentDidMount() {
    this.fetchTriviaApi();
  }

  componentDidUpdate(_prevProps, prevState) {
    const { triviaQuestions, answersDisabled } = this.state;

    if (prevState.triviaQuestions.length !== triviaQuestions.length) {
      this.checkQuestions();
    }

    if (prevState.answersDisabled !== answersDisabled) {
      this.changeDisabledBtn();
    }
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

  handleAnswerClick() {
    const wrongs = document.querySelectorAll('.wrong');
    const correct = document.querySelector('.correct');
    correct.classList.add('correct-answer');
    wrongs.forEach((wrong) => wrong.classList.add('wrong-answer'));
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
          onClick={ this.handleAnswerClick }
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
        onClick={ this.handleAnswerClick }
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
