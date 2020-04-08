import React, {PropTypes} from 'react';
import './App.css';
import 'react-bootstrap-typeahead/css/Typeahead.css';
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
          <Route exact path="/create" component={Components.Create}/>
          <body>
          <script src="/__/firebase/7.10.0/firebase-app.js"></script>
          <script src="/__/firebase/7.10.0/firebase-analytics.js"></script>
          <script src="/__/firebase/init.js"></script>
          </body>
        </div>
      </Router>
    );
  }
}

export default App