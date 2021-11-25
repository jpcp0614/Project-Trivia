import React, { Component } from 'react';

export default class TriviaScreen extends Component {
  constructor() {
    super();

    this.state = {
      triviaQuestions: [],
      questionSelector: 0,
    };

    this.fetchTriviaApi = this.fetchTriviaApi.bind(this);
  }

  componentDidMount() {
    this.fetchTriviaApi();
  }

  async fetchTriviaApi() {
    const token = JSON.parse(localStorage.getItem('token'));
    const endpoint = `https://opentdb.com/api.php?amount=5&token=${token}`;
    try {
      const response = await fetch(endpoint);
      const { results } = await response.json();
      console.log(results);
      this.setState({
        triviaQuestions: results,
      });
    } catch (error) {
      console.error(error);
    }
  }

  render() {
    const { triviaQuestions, questionSelector } = this.state;
    const triviaSelected = triviaQuestions[questionSelector];
    const checkTriviaLenght = triviaQuestions.length !== 0;
    const falseAnswers = checkTriviaLenght && triviaSelected.incorrect_answers
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
    const questionsAnswers = checkTriviaLenght && [
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
    return (
      <div>
        <h1>Tela de jogo</h1>
        <div className="game-section">
          <div className="question-section">
            <header>
              {checkTriviaLenght
                  && <h3 data-testid="question-category">{triviaSelected.category}</h3>}
            </header>
            {checkTriviaLenght
                && <p data-testid="question-text">{triviaSelected.question}</p>}
          </div>
          <div className="answers-section" />
          {checkTriviaLenght
             && questionsAnswers.map((answer) => answer)}
        </div>
      </div>
    );
  }
}
