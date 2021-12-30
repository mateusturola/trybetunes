import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import Routes from './Components/Routes';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <div className="page">
          <Routes />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
