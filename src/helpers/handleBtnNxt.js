export default function handleBtnNxt() {
  const { questionSelector } = this.state;
  const { history } = this.props;
  const FOUR = 4;
  if (questionSelector === FOUR) {
    history.push('/feedback');
  }
  this.setState({
    questionSelector: questionSelector + 1,
  });
}
