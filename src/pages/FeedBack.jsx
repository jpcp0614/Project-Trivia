import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';

class FeedBack extends Component {
  constructor() {
    super();
    this.state = {
      getHash: '',
      score: 0,
      assertions: 0,
      message: '',
    };
    this.fetchGravatarApi = this.fetchGravatarApi.bind(this);
    this.getPlayer = this.getPlayer.bind(this);
    this.messageAssertion = this.messageAssertion.bind(this);
  }

  componentDidMount() {
    const { email } = this.props;
    this.fetchGravatarApi(email);
    this.getPlayer();
  }

  getPlayer() {
    const obejectState = JSON.parse(localStorage.getItem('state'));
    const { score, assertions } = obejectState.player;
    console.log(score, assertions);
    this.setState({
      score,
      assertions,
    });
    this.messageAssertion(assertions);
  }

  messageAssertion(assertions) {
    const THREE = 3;

    if (assertions < THREE) {
      this.setState({ message: 'Podia ser melhor...' });
    }
    if (assertions >= THREE) {
      this.setState({ message: 'Mandou bem!' });
    }
  }

  fetchGravatarApi(email) {
    const hash = md5(email).toString();
    this.setState({
      getHash: `https://www.gravatar.com/avatar/${hash}`,
    });
  }

  render() {
    const { name } = this.props;
    const { getHash, score, message, assertions } = this.state;

    return (
      <div>
        <header>
          <h3 data-testid="feedback-text">{ message }</h3>
          <img
            src={ getHash }
            alt="Foto de perfil do usuário"
            data-testid="header-profile-picture"
          />
          <p data-testid="header-player-name">{ name }</p>
          <p data-testid="header-score">{ score }</p>
        </header>
        <section>
          <p data-testid="feedback-total-score">{ score }</p>
          <p data-testid="feedback-total-question">{ assertions }</p>
        </section>
      </div>
    );
  }
}

FeedBack.propTypes = {
  email: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  name: state.login.name,
  email: state.login.email,
});

export default connect(mapStateToProps)(FeedBack);
