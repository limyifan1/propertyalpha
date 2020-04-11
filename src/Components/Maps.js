import React, {PropTypes} from 'react';
import '../App.css';
import GoogleMap from 'google-map-react';
import Marker from './Marker'
import Papa from 'papaparse';
import file from '../listings_cropped.csv'
import {db, storage} from './Firestore'
import {Spinner} from 'react-bootstrap'
import {withRouter} from 'react-router-dom';
import queryString from 'query-string';

const API_KEY = `${process.env.REACT_APP_GKEY}`

const getMapBounds = (map, maps, places) => {
  const bounds = new maps.LatLngBounds();
  if (places !== undefined && places.data.length!==0) {
    places.data.forEach(function(data) {
      bounds.extend({lat: parseFloat(data.latitude), lng:parseFloat(data.longitude)})
      }
    )
    return bounds
  }
};

const apiIsLoaded = (map, maps, places) => {
  const bounds = getMapBounds(map, maps, places);
  if (bounds){
    map.fitBounds(bounds);
    var zoom = map.getZoom();
    map.setZoom(zoom > 16 ? 16 : zoom);
  }
};

export class Maps extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      // query: queryString.parse(this.props.location.search).query,
      // longitude: queryString.parse(this.props.location.search).lon,
      // latitude: queryString.parse(this.props.location.search).lat,
      // distance: queryString.parse(this.props.location.search).distance,
      // retrieved: false
    };
    // const values = queryString.parse(this.props.location.search)
    // this.getData = this.getData.bind(this);
  }

  componentWillMount() {
    // this.getFirestoreData();
  }

  componentDidMount(){
  }

  retrieveData = async () => {
    let string = {
      longitude:this.state.longitude,
      latitude:this.state.latitude,
      query:this.state.query,
      distance:this.state.distance
    }
    try {
      const response = await fetch('https://us-central1-propertyalpha-1428b.cloudfunctions.net/search', {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(string)
      });
      return response.json();
    }
    catch (error) {
      return error;
    }
  }

  async getFirestoreData() {
    let fireData = await this.retrieveData();
    let data = []
    fireData.forEach(function(doc){
        data.push(doc)
    });
    this.setState({data:data})
    this.setState({retrieved:true})
    this.props.sendData(data)
  }

  getData(result) {
    this.setState({data: result.data});
    this.props.sendData(result.data)
  }

  _onChildMouseEnter = function(hoverKey){
    let index = parseInt(hoverKey)
    if (this.props.data.data.length!==0){
      let data = this.props.data.data
      data[index].show = true
      this.setState({data:data})
    }
  }

  _onChildMouseLeave = function(hoverKey){
    let index = parseInt(hoverKey)
    if (this.props.data.data.length!==0){
      let data = this.props.data.data
      data[index].show = false
      this.setState({data:data})
    }
  }

  mapRender(result) {
    if (this.props.data.data.length > 0){      
      return (
        <GoogleMap
        bootstrapURLKeys={{ key: API_KEY}}
        defaultCenter={[parseFloat(this.props.data.latitude),parseFloat(this.props.data.longitude)]}
        defaultZoom={16}
        onChildMouseEnter={this._onChildMouseEnter.bind(this)}
        onChildMouseLeave={this._onChildMouseLeave.bind(this)}
        yesIWantToUseGoogleMapApiInternals
        // onGoogleApiLoaded={({ map, maps }) => apiIsLoaded(map, maps, this.state)}
        >
          {result}
        </GoogleMap>)
    }
    else{
      return(
        <GoogleMap
        bootstrapURLKeys={{ key: API_KEY}}
        defaultCenter={[1.3521,103.8198]}
        defaultZoom={12}
        >
        </GoogleMap>
      )
    }
  }

  render() {
    let count = -1
    let result = [];

    if (this.props.data.data){
      this.props.data.data.forEach(function(data) {
        count += 1
        result.push(
          <Marker 
            key={count}
            text={data.street}
            pic={data.url}
            street={data.street}
            price={data.price}
            lat = {parseFloat(data.latitude)}
            lng = {parseFloat(data.longitude)}
            show = {data.show}
          />)
      });
    }

    return (
        <div className="map-container">
          { 
            this.mapRender(result)
          }
        </div>
    );
  }
}

export default withRouter(Maps)