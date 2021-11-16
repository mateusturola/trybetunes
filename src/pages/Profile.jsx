import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../Components/Header';
import Load from '../Components/Load';
import { getUser } from '../services/userAPI';

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      saving: false,
      user: { description: '', email: '', image: '', name: '' },
    };
    this.loadUser = this.loadUser.bind(this);
  }

  componentDidMount() {
    this.loadUser();
  }

  loadUser() {
    this.setState({ saving: true });
    getUser().then((user) => {
      this.setState({ user, saving: false });
    });
  }

  render() {
    const { saving, user } = this.state;
    return (
      <div data-testid="page-profile">
        <Header />
        {saving ? (
          <Load />
        ) : (
          <div>
            <img src={ user.image } alt={ user.name } data-testid="profile-image" />
            <h4>{user.name}</h4>
            <p>{user.email}</p>
            <p>{user.description}</p>
            <Link to="profile/edit">Editar perfil</Link>
          </div>
        )}
      </div>
    );
  }
}

export default Profile;
