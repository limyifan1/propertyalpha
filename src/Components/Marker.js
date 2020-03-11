import React from 'react';
import PropTypes from 'prop-types';
import '../App.css';

const InfoWindow = () => {
  return (
    <div>
      <div class="card" style={{"width":"100px", bottom:"15px"}}>
        Hello there
      </div>
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
          <div class="pin1"></div>
          <div>
            {this.props.show && <InfoWindow />}
          </div>
        </div>
    );
  }
}

  export default Marker