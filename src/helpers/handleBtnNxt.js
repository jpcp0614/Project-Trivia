export default function handleBtnNxt() {
  const { questionSelector } = this.state;
  this.setState({
    questionSelector: questionSelector + 1,
  });
}
