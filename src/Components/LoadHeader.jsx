import React, { Component } from 'react';
import '../Styles/loading.css';


class LoadHeader extends Component {
  render() {
    return (
      <div className="load-box-header">
        <div class="c-loader-header"></div>
        <h3 className="load-text">Carregando...</h3>
      </div>
    );
  }
}

export default LoadHeader;
