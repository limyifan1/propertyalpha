import React from 'react';
import '../App.css';
import db from './Firestore'
import GoogleMap from 'google-map-react';
import Component from '../Components'

const API_KEY = `${process.env.REACT_APP_GKEY}`

const addData = () => {
  db.collection("properties").add({
    first: "Ada",
    last: "Lovelace",
    born: 1815
  })
  .then(function(docRef) {
      console.log("Document written with ID: ", docRef.id);
      alert("Sent")
  })
  .catch(function(error) {
      console.error("Error adding document: ", error);
      alert("Failed")
  });
}

export class Create extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: []
    };
  }
  apiHasLoaded(map, maps){
    if (map && maps) {
      this.setState({
        apiReady: true,
        map: map,
        maps: maps
      });
    }
  }

  render({ apiReady, maps, map } = this.state) {
    return (
      <div className="map-container">
      <GoogleMap
      bootstrapURLKeys={{ key: API_KEY, libraries:'places'}}
      defaultCenter={[47.63628904, -122.3710252]}
      defaultZoom={9}
      yesIWantToUseGoogleMapApiInternals
      onGoogleApiLoaded={({ map, maps }) => this.apiHasLoaded(map, maps)}
      >
        {apiReady && <Component.SearchBox
          map={map}
          maps={maps}
        />}
      </GoogleMap>
    </div>
);
  }
}

export default Create