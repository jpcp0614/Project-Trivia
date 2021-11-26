export default function checkQuestions() {
  const { triviaQuestions } = this.state;
  const checkTriviaLength = triviaQuestions.length !== 0;

  if (checkTriviaLength) {
    this.setState({ isFilled: true });
    this.generateAnswers(true);
  }
}
