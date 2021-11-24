import React, { Component } from 'react';

export default class Login extends Component {
  render() {
    return (
      <form>
        <label htmlFor="input-player-name">
          Nome:
          <input
            data-testid="input-player-name"
            id="input-player-name"
            type="text"
          />
        </label>

        <label htmlFor="input-gravatar-email">
          Email:
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
