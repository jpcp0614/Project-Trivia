import React, { Component } from 'react';

export default class TriviaScreen extends Component {
  constructor() {
    super();

    this.state = {
      triviaQuestions: [],
      questionSelector: 0,
      isFilled: false,
    };

    this.fetchTriviaApi = this.fetchTriviaApi.bind(this);
    this.checkQuestions = this.checkQuestions.bind(this);
  }

  componentDidMount() {
    this.fetchTriviaApi();
  }

  componentDidUpdate(_prevProps, prevState) {
    const { triviaQuestions } = this.state;

    if (prevState.triviaQuestions.length !== triviaQuestions.length) {
      this.checkQuestions();
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

    if (checkTriviaLenght) this.setState({ isFilled: true });
  }

  generateAswers() {
    const { isFilled, questionSelector, triviaQuestions } = this.state;
    const triviaSelected = triviaQuestions[questionSelector];
    const falseAnswers = isFilled && triviaSelected.incorrect_answers
      .map((answer, index) => (
        <button
          type="button"
          key={ `wrong-answer-${index + 1}` }
          data-testid={ `wrong-answer-${index}` }
          className="wrong-answer answer"
        >
          {answer}
        </button>
      ));

    const questionsAnswers = isFilled && [
      <button
        type="button"
        key="correct-answer"
        data-testid="correct-answer"
        className="correct-answer answer"
      >
        {triviaSelected.correct_answer}
      </button>,
      ...falseAnswers,
    ];

    return questionsAnswers;
  }

  render() {
    const { isFilled, questionSelector, triviaQuestions } = this.state;
    const triviaSelected = triviaQuestions[questionSelector];
    const aswers = this.generateAswers();

    return (
      <div>
        <h1>Tela de jogo</h1>
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
             && aswers.map((answer) => answer)}
        </div>
      </div>
    );
  }
}
