import React, {PropTypes} from 'react';
import '../App.css';
import GoogleMap from 'google-map-react';
import Marker from './Marker'
import Papa from 'papaparse';
import file from '../listings_cropped.csv'

const API_KEY = `${process.env.REACT_APP_GKEY}`

const getMapBounds = (map, maps, places) => {
  const bounds = new maps.LatLngBounds();
  if (places !== undefined && places.data.length!==0) {
    places.data.forEach(element => {
      bounds.extend({lat: parseFloat(element.latitude), lng:parseFloat(element.longitude)})
    })
    return bounds
  }
};

const apiIsLoaded = (map, maps, places) => {
  const bounds = getMapBounds(map, maps, places);
  if (bounds){
    map.fitBounds(bounds);
  }
};

export class Maps extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
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
    this.props.sendData(result.data)
  }

  _onChildMouseEnter = function(hoverKey){
    let index = parseInt(hoverKey)
    if (this.state.data.length!==0){
      let data = this.state.data
      data[index].show = true
      this.setState({data:data})
    }
  }

  _onChildMouseLeave = function(hoverKey){
    let index = parseInt(hoverKey)
    if (this.state.data.length!==0){
      let data = this.state.data
      data[index].show = false
      this.setState({data:data})
    }
  }

  render() {
    let renderMarkers
    let count = -1
    if (this.state.data.length!==0){
      renderMarkers = this.state.data.map(place =>{
        count += 1
        return <Marker 
                  key={count}
                  text={place.name}
                  pic={place.picture_url}
                  street={place.street}
                  price={place.price}
                  lat = {place.latitude}
                  lng = {place.longitude}
                  show = {place.show}
                />
      })
    }
    
    return (
        <div className="map-container">
          {this.state.data.length!==0 ?
          <GoogleMap
          bootstrapURLKeys={{ key: API_KEY}}
          defaultCenter={[47.63628904, -122.3710252]}
          defaultZoom={9}
          onChildMouseEnter={this._onChildMouseEnter.bind(this)}
          onChildMouseLeave={this._onChildMouseLeave.bind(this)}
          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={({ map, maps }) => apiIsLoaded(map, maps, this.state)}
          >
            {renderMarkers}
          </GoogleMap>
          : null
        }
        </div>
    );
  }
}

export default Maps