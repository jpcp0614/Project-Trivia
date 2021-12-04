import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';

class Header extends Component {
  constructor() {
    super();
    this.state = {
      getHash: '',
    };
    this.fetchGravatarApi = this.fetchGravatarApi.bind(this);
  }

  componentDidMount() {
    const { email } = this.props;
    this.fetchGravatarApi(email);
  }

  fetchGravatarApi(email) {
    const hash = md5(email).toString();
    this.setState({
      getHash: `https://www.gravatar.com/avatar/${hash}`,
    });
  }

  render() {
    const { name } = this.props;
    const { getHash } = this.state;
    return (
      <header>
        <img
          src={ getHash }
          alt="Foto de perfil do usuário"
          data-testid="header-profile-picture"
        />
        <p data-testid="header-player-name">{ name }</p>
        <p data-testid="header-score">0</p>
      </header>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  name: state.login.name,
  email: state.login.email,
});

export default connect(mapStateToProps)(Header);
