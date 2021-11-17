import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Load from './Load';
import '../Styles/header.css';
import LoadHeader from './LoadHeader';

class Header extends Component {
  constructor() {
    super();
    this.state = {
      userName: '',
      userImage: '',
    };
  }

  componentDidMount() {
    this.setUser();
  }

  async setUser() {
    const userData = await getUser();
    this.setState({ userName: userData.name, userImage: 'https://api.ejcomp.com.br/members/1586969992913-perfilsemfoto.jpg' });
  }

  render() {
    const { userName, userImage } = this.state;
    return (
      <header data-testid="header-component">
        <div className="header-top">
          <div className="logo-topo"></div>
          <div className="username-header">
            {!userName ? (
              <LoadHeader />
            ) : (
              <div data-testid="header-user-name" className="header-user">
                <img src={ userImage } alt="Profile" className="profile-image" />
                <h3 className="profile-name">{userName}</h3>
              </div>
            )}
          </div>
        </div>
        <nav className="menu">
          <Link to="/search" data-testid="link-to-search" className="menu-item">
            Pesquisar
          </Link>
          <Link
            to="/favorites"
            data-testid="link-to-favorites"
            className="menu-item"
          >
            Favoritos
          </Link>
          <Link to="/profile" data-testid="link-to-profile" className="menu-item">
            Meu perfil
          </Link>
        </nav>
      </header>
    );
  }
}

export default Header;
