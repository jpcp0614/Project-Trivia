import React, { Component } from 'react';

class Header extends Component {
  render() {
    return (
      <header>
        <img
          src=""
          alt="Foto de perfil do usuário"
          data-testid="header-profile-picture"
        />
        <em data-testid="header-player-name">nome do usuário</em>
        <em data-testid="header-score">0</em>
      </header>
    );
  }
}

export default Header;
