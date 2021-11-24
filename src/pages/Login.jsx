import React, { Component } from 'react';

export default class Login extends Component {
  render() {
    return (
      <form
        className="form-login"
      >
        <label htmlFor="input-player-name">
          <span>Nome:</span>
          <input
            data-testid="input-player-name"
            id="input-player-name"
            type="text"
          />
        </label>

        <label htmlFor="input-gravatar-email">
          <span>Email:</span>
          <input
            data-testid="input-gravatar-email"
            id="input-gravatar-email"
            type="email"
          />
        </label>

        <button
          data-testid="btn-play"
          type="submit"
        >
          Jogar
        </button>

      </form>
    );
  }
}
