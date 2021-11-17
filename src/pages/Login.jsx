import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Load from '../Components/Load';
import { createUser } from '../services/userAPI';
import '../Styles/login.css'

class Login extends Component {
  constructor() {
    super();
    this.state = {
      userName: '',
      isDisable: true,
      saving: false,
      logged: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.enableButton = this.enableButton.bind(this);
    this.saveUser = this.saveUser.bind(this);
  }

  handleChange({ target }) {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({ [name]: value }, this.enableButton);
  }

  enableButton() {
    const NUMCARACTERE = 3;
    const { userName } = this.state;

    if (userName.length >= NUMCARACTERE) this.setState({ isDisable: false });
  }

  saveUser(userName) {
    this.setState({ saving: true }, () => {
      createUser({ name: userName }).then(() => this.setState({
        saving: false,
        logged: true,
      }));
    });
  }

  render() {
    const {
      state: { isDisable, userName, saving, logged },
      saveUser,
      handleChange,
    } = this;

    if (logged) {
      return <Redirect to="./search" />;
    }
    if (saving) {
      return <Load />;
    }
    return (
      <main className="login-page">
      <div className="logo"></div>
      <main className="login">
        <input
          type="text"
          name="userName"
          placeholder="Username"
          data-testid="login-name-input"
          onChange={ handleChange }
        />
        <button
          type="button"
          data-testid="login-submit-button"
          disabled={ isDisable }
          onClick={ () => saveUser(userName) }
        >
          Entrar
        </button>
      </main>
      </main>
    );
  }
}

export default Login;
