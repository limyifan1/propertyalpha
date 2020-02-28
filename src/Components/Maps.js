import React, {PropTypes} from 'react';
import Map , {GoogleApiWrapper} from 'google-maps-react'

const API_KEY = `${process.env.REACT_APP_GKEY}`

export class Maps extends React.Component {
    render() {
      return (
        <div>
          Maps
          <Map google={this.props.google} />
        </div>
      );
    }
  }

  export default GoogleApiWrapper({
    apiKey: API_KEY
  })(Maps)