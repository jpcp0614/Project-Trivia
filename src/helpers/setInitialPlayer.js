export default function setInitialPlayer() {
  const state = {
    player: {
      name: '',
      assertions: 0,
      score: 0,
      gravatarEmail: '',
    },
  };
  localStorage.setItem('state', JSON.stringify(state));
}
