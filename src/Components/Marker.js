import React from 'react';
import PropTypes from 'prop-types';
import '../App.css';

const InfoWindow = (props) => {
  return (
    <div>
      <div class="card" style={{"width":"250px", "bottom":"140px", "z-index":"1000"}}>
        <div class="row no-gutters">
            <div class="col-md-4">
                <img src={props.pic} class="rounded float-left card-img-top"
                 style={{"max-height":"100px", "max-width":"80px", "padding":"5px"}}></img>
            </div>
            <div class="col-md-8" style={{"padding-top":"5px"}}>
                <div style={{"padding-left":"0px"}} >
                    <h6 class="card-title">{props.street}</h6>
                    <h6 class="card-text">${props.price}</h6>
                </div>
            </div>
        </div>
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
            {this.props.show && <InfoWindow {...this.props}/>}
          </div>
        </div>
    );
  }
}

  export default Marker