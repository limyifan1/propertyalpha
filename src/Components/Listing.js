import React, {PropTypes} from 'react';
// import Map, {GoogleApiWrapper, Marker, InfoWindow} from 'google-maps-react'
import '../App.css';
import Sidebar from './Sidebar'
import Papa from 'papaparse';
import file from '../listings_cropped.csv'
import Component from '../Components'

const API_KEY = `${process.env.REACT_APP_GKEY}`

export class Listing extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      markers: {},
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},
      data: []
    };

    this.getData = this.getData.bind(this);
  }

  componentWillMount() {
    this.getCsvData();
  }

  fetchCsv() {
      return fetch(file).then(function (response) {
          let reader = response.body.getReader();
          let decoder = new TextDecoder('utf-8');
          return reader.read().then(function (result) {
              return decoder.decode(result.value);
          });
      });
  }

  async getCsvData() {
    let csvData = await this.fetchCsv();
    Papa.parse(csvData, {
      header: true, 
      complete: this.getData
    });
  }

  getData(result) {
    this.setState({data: result.data});
  }

  render() {
    return (
      <div>
        <div>
          <Sidebar data={this.state}/>
        </div>
        <div>
          <Component.Maps data={this.state.data}/>
        </div>
      </div>
    );
  }
}

export default Listing