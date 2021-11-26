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
    };
    this.fetchGravatarApi = this.fetchGravatarApi.bind(this);
    this.getScore = this.getScore.bind(this);
  }

  componentDidMount() {
    const { email } = this.props;
    this.fetchGravatarApi(email);
    this.getScore();
  }

  getScore() {
    const obejectState = JSON.parse(localStorage.getItem('state'));
    const { score } = obejectState.player;
    this.setState({ score });
  }

  fetchGravatarApi(email) {
    const hash = md5(email).toString();
    this.setState({
      getHash: `https://www.gravatar.com/avatar/${hash}`,
    });
  }

  render() {
    const { name } = this.props;
    const { getHash, score } = this.state;

    return (
      <header>
        <h3 data-testid="feedback-text">Você está na página de Feedback</h3>
        <img
          src={ getHash }
          alt="Foto de perfil do usuário"
          data-testid="header-profile-picture"
        />
        <p data-testid="header-player-name">{ name }</p>
        <p data-testid="header-score">{ score }</p>
      </header>
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
