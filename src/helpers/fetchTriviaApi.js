export default async function fetchTriviaApi() {
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
