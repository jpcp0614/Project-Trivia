export default function incorrectOrCorrect({ target: { className } }) {
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
      score: prevState.score + correctAnswerValue || 0 + correctAnswerValue,
    }));
  }
}
