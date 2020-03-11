import React from 'react';
import PropTypes from 'prop-types';
import '../App.css';

const InfoWindow = () => {
  return (
    <div>
      Hello there
    </div>
  )
}

export class Marker extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
        data: []
    };
  }

  static propTypes = {
    $hover: PropTypes.bool
  };

  render() {
    return (
        <div>
          <InfoWindow />
          <div class="pin1"></div>
        </div>
    );
  }
}

  export default Marker