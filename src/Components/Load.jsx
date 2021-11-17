import React, { Component } from 'react';
import '../Styles/loading.css';


class Load extends Component {
  render() {
    return (
      <div className="load-box">
        <div class="c-loader"></div>
        <h3 className="load-text-black">Carregando...</h3>

      </div>
    );
  }
}

export default Load;
