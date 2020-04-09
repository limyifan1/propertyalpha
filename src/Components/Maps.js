import React, {PropTypes} from 'react';
import '../App.css';
import GoogleMap from 'google-map-react';
import Marker from './Marker'
import Papa from 'papaparse';
import file from '../listings_cropped.csv'
import {db, storage} from './Firestore'
import {Spinner} from 'react-bootstrap'

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
    };
    this.getData = this.getData.bind(this);
  }

  componentWillMount() {
    this.getFirestoreData();
  }

  // retrieveData = () => {
  //   return db.collection("properties").get().then(function(querySnapshot) {
  //     return querySnapshot
  //   }).catch(function(error) {
  //     console.log("Error getting document:", error);
  //   });
  // }

  retrieveData = () => {
    return fetch('https://us-central1-propertyalpha-1428b.cloudfunctions.net/search').then((response)=>{
        return response.json()
      }
    ).catch((error)=>{
      return error
    })
  }

  async getFirestoreData() {
    let fireData = await this.retrieveData();
    let data = []
    fireData.forEach(function(doc){
        data.push(doc)
    });
    // console.log(data)
    this.setState({data:data})
    this.props.sendData(data)
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
    let count = -1
    let result = [];

    if (this.state.data){
      this.state.data.forEach(function(data) {
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
            {result}
          </GoogleMap>
          :
          <div class="row h-100">
            <div class="col-sm-12 my-auto">
              <Spinner class="" animation="grow" />
            </div>
          </div>
        }
          
        </div>
    );
  }
}

export default Maps