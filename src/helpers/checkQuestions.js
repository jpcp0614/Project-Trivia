export default function checkQuestions(callback) {
  const { triviaQuestions } = this.state;
  const checkTriviaLength = triviaQuestions.length !== 0;

  if (checkTriviaLength) {
    this.setState({ isFilled: true });
    callback(true);
  }
}
