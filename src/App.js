import React, {PropTypes} from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Components from './Components'

export class App extends React.Component {
  render() {
    return (
      <Router>
        <Components.Menu />
        <div className="App">
          <Route exact path="/" component={Components.Home} />
          <Route exact path="/listing" component={Components.Listing}/>
        </div>
      </Router>
    );
  }
}

export default App