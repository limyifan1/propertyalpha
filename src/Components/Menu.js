import React, {PropTypes} from 'react';
import { Link } from 'react-router-dom';

export class Menu extends React.Component {
    render() {
      return (
        <div>
          <Link to="/">
            <button>Home</button>
          </Link>
          <Link to="/map">
            <button>Map</button>
          </Link>
        </div>
      );
    }
  }

  export default Menu