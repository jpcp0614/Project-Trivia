import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import logo from '../assets/images/trivia.png';
import { loginAction } from '../redux/actions';
import fetchTokenApi from '../services';

class Login extends Component {
  constructor() {
    super();

    this.state = {
      name: '',
      email: '',
      isBtnDisabled: true,
    };

    this.handleChange = this.handleChange.bind(this);
    this.enabledLoginBtn = this.enabledLoginBtn.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  async handleSubmit(event) {
    event.preventDefault();
    const { history, sendNameEmail } = this.props;
    const { name, email } = this.state;
    const token = await fetchTokenApi();
    localStorage.setItem('token', JSON.stringify(token));
    sendNameEmail(name, email);
    history.push('/game');
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, () => this.enabledLoginBtn());
  }

  enabledLoginBtn() {
    const { name, email } = this.state;
    // Regex tirado do site https://regexr.com/
    const checkEmail = /\b[\w.-]+@[\w.-]+\.\w{2,4}\b/gi.test(email);
    if (name && checkEmail) {
      this.setState({ isBtnDisabled: false });
    } else {
      this.setState({ isBtnDisabled: true });
    }
  }

  handleClick() {
    const { history } = this.props;
    history.push('/settings');
  }

  render() {
    const { email, isBtnDisabled, name } = this.state;
    const { handleChange, handleSubmit, handleClick } = this;
    return (
      <div>
        <header className="App-header">
          <img src={ logo } className="App-logo" alt="logo" />
          <p>SUA VEZ</p>
        </header>
        <form className="form-login">
          <label htmlFor="input-player-name">
            <span>Nome:</span>
            <input
              data-testid="input-player-name"
              id="input-player-name"
              name="name"
              onChange={ handleChange }
              type="text"
              value={ name }
            />
          </label>

          <label htmlFor="input-gravatar-email">
            <span>Email:</span>
            <input
              data-testid="input-gravatar-email"
              id="input-gravatar-email"
              name="email"
              onChange={ handleChange }
              type="email"
              value={ email }
            />
          </label>
          <button
            data-testid="btn-play"
            disabled={ isBtnDisabled }
            onClick={ handleSubmit }
            type="submit"
          >
            Jogar
          </button>
        </form>
        <button type="button" data-testid="btn-settings" onClick={ handleClick }>
          Configurações
        </button>
      </div>

    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  sendNameEmail: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  sendNameEmail: (name, email) => dispatch(loginAction(name, email)),
});

export default connect(null, mapDispatchToProps)(Login);
