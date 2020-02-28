import React, {PropTypes} from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Map , {GoogleApiWrapper} from 'google-maps-react'
import Components from './Components'

export class App extends React.Component {
  render() {
    return (
      <Router>
        <header> Hello World </header>
        {/* <Map google={this.props.google} /> */}
        <Components.Menu />
        <div className="App">
          <Route exact path="/" component={Components.Home} />
          <Route exact path="/map" component={Components.Maps}/>
        </div>
      </Router>
    );
  }
}

// const map = () => (
//   <div>
//     Map
//     {/* <Map google={this.props.google} /> */}
//   </div>
// )

// export default GoogleApiWrapper({
//   apiKey: API_KEY
// })(App)
export default App