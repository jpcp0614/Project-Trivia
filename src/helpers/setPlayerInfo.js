export default function setPlayerInfo() {
  const { assertions, score } = this.state;
  const { name, email } = this.props;
  const state = {
    player: {
      name,
      assertions,
      score,
      gravatarEmail: email,
    },
  };
  localStorage.setItem('state', JSON.stringify(state));
}
