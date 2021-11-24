import React, { Component } from 'react';

export default class Login extends Component {
  constructor() {
    super();

    this.state = {
      name: '',
      email: '',
      isBtnDisabled: true,
    };

    this.handleChange = this.handleChange.bind(this);
    this.enabledLoginBtn = this.enabledLoginBtn.bind(this);
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

  render() {
    const { email, isBtnDisabled, name } = this.state;
    const { handleChange } = this;
    return (
      <form
        className="form-login"
        onSubmit={ (event) => {
          event.preventDefault();
        } }
      >
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
          type="submit"
        >
          Jogar
        </button>

      </form>
    );
  }
}
