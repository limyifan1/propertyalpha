import React, {PropTypes} from 'react';
import '../App.css';
import GoogleMap from 'google-map-react';
import Marker from './Marker'

const API_KEY = `${process.env.REACT_APP_GKEY}`

const getMapBounds = (map, maps, places) => {
  const bounds = new maps.LatLngBounds();

  if (places.data.length!==0) {
    places.data.forEach(element => {
      bounds.extend({lat: parseFloat(element.latitude), lng:parseFloat(element.longitude)})
    })
  }
  return bounds;
};

const apiIsLoaded = (map, maps, places) => {
  const bounds = getMapBounds(map, maps, places);
  map.fitBounds(bounds);
};

export class Maps extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
        data: []
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    return true
  }


  _onChildMouseEnter = function(){
    
  }

  render() {
    let renderMarkers
    if (this.props.data.length!==0){
      renderMarkers = this.props.data.map(place =>{
        return <Marker 
                  text={place.name}
                  pic={place.picture_url}
                  street={place.street}
                  price={place.price}
                  lat = {place.latitude}
                  lng = {place.longitude}
                />
      })
    }
  
    return (
        <div className="map-container">
          <GoogleMap
          bootstrapURLKeys={{ key: API_KEY}}
          defaultCenter={[47.63628904, -122.3710252]}
          defaultZoom={9}
          onChildMouseEnter={this._onChildMouseEnter}
          onGoogleApiLoaded={({ map, maps }) => apiIsLoaded(map, maps, this.props)}
          >
            {renderMarkers}
          </GoogleMap>

        </div>
    );
  }
}

export default Maps