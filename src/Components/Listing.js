import React from 'react';
// import Map, {GoogleApiWrapper, Marker, InfoWindow} from 'google-maps-react'
import '../App.css';
import Sidebar from './Sidebar'
import Component from '../Components'

export class Listing extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: []
    };
  }

  getData(val){
    this.setState({data:val})
  }

  render() {
    return (
      <div>
        <div>
          <Sidebar data={this.state}/>
        </div>
        <div>
          <Component.Maps sendData={this.getData.bind(this)}/>
        </div>
      </div>
    );
  }
}

export default Listing