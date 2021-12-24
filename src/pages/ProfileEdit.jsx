import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Header from '../Components/Header';
import Load from '../Components/Load';
import { getUser, updateUser } from '../services/userAPI';
import '../Styles/profile.css';
import '../Styles/profile-edit.css';


class ProfileEdit extends Component {
  constructor() {
    super();
    this.state = {
      user: { description: '', email: '', image: '', name: '' },
      saving: false,
      isDisable: true,
      done: false,
    };
    this.loadUser = this.loadUser.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.validateInputs = this.validateInputs.bind(this);
    this.saveData = this.saveData.bind(this);
  }

  componentDidMount() {
    this.loadUser();
  }

  handleInput({ target }) {
    const { name, value } = target;
    this.setState(
      (prev) => ({ user: { ...prev.user, [name]: value } }),
      this.validateInputs(),
    );
  }

  loadUser() {
    this.setState({ saving: true });
    getUser().then((user) => {
      this.setState({ user, saving: false }, () => this.validateInputs());
    });
  }

  validateInputs() {
    const {
      user: { description, email, image, name },
    } = this.state;
    if (
      description.length > 0
      && email.length > 0
      && image.length > 0
      && name.length > 0
    ) {
      this.setState({ isDisable: false });
    }
  }

  saveData() {
    const { user } = this.state;
    this.setState({ saving: true });
    updateUser(user).then(() => this.setState({ saving: false, done: true }));
  }

  render() {
    const {
      saving,
      user: { description, email, image, name },
      isDisable,
      done,
    } = this.state;

    if (done) {
      return <Redirect to="/profile" />;
    }
    return (
      <div data-testid="page-profile-edit" className="page-profile-edit">
        <Header />
        {saving ? (
          <Load />
        ) : (
          <div className="profile-edit">
            <label htmlFor="name">
              Nome:
              <input
                type="text"
                value={ name }
                id="name"
                name="name"
                data-testid="edit-input-name"
                onChange={ this.handleInput }
              />
            </label>
            <label htmlFor="email">
              E-mail
              <input
                type="text"
                value={ email }
                id="email"
                name="email"
                data-testid="edit-input-email"
                onChange={ this.handleInput }
              />
            </label>
            <label htmlFor="description">
              Sobre você:
              <textarea
                id="description"
                name="description"
                rows="5"
                cols="33"
                onChange={ this.handleInput }
                value={ description }
                data-testid="edit-input-description"
              />
            </label>
            <label htmlFor="image">
              Foto de Perfil:
              <input
                type="text"
                value={ image }
                id="image"
                name="image"
                data-testid="edit-input-image"
                onChange={ this.handleInput }
              />
            </label>
            <button
              type="button"
              data-testid="edit-button-save"
              disabled={ isDisable }
              onClick={ this.saveData }
            >
              Editar perfil
            </button>
          </div>
        )}
      </div>
    );
  }
}

export default ProfileEdit;
