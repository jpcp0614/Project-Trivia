import React from 'react';
import shuffleAnswers from './shuffleAnswers';

export default function generateAnswers(checker) {
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

    const randomAnswer = shuffleAnswers(questionsAnswers);
    triviaAnswers.push(randomAnswer);
  });
  this.setState({ answers: triviaAnswers });
}
