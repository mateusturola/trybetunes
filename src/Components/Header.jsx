import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Load from './Load';

class Header extends Component {
  constructor() {
    super();
    this.state = {
      userName: '',
    };
  }

  componentDidMount() {
    this.setUser();
  }

  async setUser() {
    const userData = await getUser();
    this.setState({ userName: userData.name });
  }

  render() {
    const { userName } = this.state;
    return (
      <header data-testid="header-component">
        {!userName ? (
          <Load />
        ) : (
          <h3 data-testid="header-user-name">{userName}</h3>
        )}
        <nav>
          <Link to="/search" data-testid="link-to-search" className="menu">
            Pesquisar
          </Link>
          <Link
            to="/favorites"
            data-testid="link-to-favorites"
            className="menu"
          >
            Favoritos
          </Link>
          <Link to="/profile" data-testid="link-to-profile" className="menu">
            Meu perfil
          </Link>
        </nav>
      </header>
    );
  }
}

export default Header;
