import React, {useState} from 'react';
import '../App.css';
import {db, storage, firebase} from './Firestore'
import GoogleMap from 'google-map-react';
import Component from '../Components'

const API_KEY = `${process.env.REACT_APP_GKEY}`

const addData = (postal,street,price,description,url) => {
  db.collection("properties").add({
    postal: postal,
    street: street,
    price: price,
    description: description,
    url: url,
  })
  .then(function(docRef) {
      console.log("Document written with ID: ", docRef.id);
      // alert("Sent")
  })
  .catch(function(error) {
      console.error("Error adding document: ", error);
      // alert("Failed")
  });
}

export class Create extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      postal: 0,
      street: '',
      price: 0,
      description:'',
      url:'',
      imageFile: '',
      imageName: 'Upload Image'
    };
    // this.handleSubmit = this.handleSubmit(this);
    // this.handleChange = this.handleChange(this);
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

  handleSubmit = (event) => {
    // alert('A name was submitted: ' + this.state.street);
    console.log(this.state.street);
    addData(
      this.state.postal,
      this.state.street,
      this.state.price,
      this.state.description,
      this.state.url,
      )
    event.preventDefault();
  }

  handleChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({[name]: value});
  }

  handleImageAsFile = (event) => {
    event.preventDefault()
    const image = event.target.files[0]
    this.setState({imageFile: image})
    this.setState({imageName: image.name})
    this.handleFireBaseUpload(image)
  }

  handleFireBaseUpload = (image) => {
    // event.preventDefault()
    alert('start of upload')
    var date = new Date();
    var timestamp = date.getTime();
    const uploadTask = storage.ref(`/images/${timestamp+"_"+image.name}`).put(image)
    uploadTask.on('state_changed', 
    (snapShot) => {
      //takes a snap shot of the process as it is happening
      console.log(snapShot)
    }, (err) => {
      //catches the errors
      console.log(err)
    }, () => {
      // gets the functions from storage refences the image storage in firebase by the children
      // gets the download url then sets the image from firebase as the value for the imgUrl key:
      storage.ref('images').child(this.state.imageFile.name).getDownloadURL()
       .then(fireBaseUrl => {
         this.setState({url: fireBaseUrl})
       })
    })
  }  

  render({ apiReady, maps, map } = this.state) {
    return (
      <div class="container" style={{"padding-top":"70px"}}>
        <h3>Create Property Listing</h3>
        <div class="row">
          <div class="col">
            <div class="card shadow" style={{"width": "100%", "margin-top": "10px"}}>
              <div class="card-body">
                <h5 class="card-title">Upload Images</h5>
                <h6 class="card-subtitle mb-2 text-muted">Upload images of your listed property below</h6>
                <p class="card-text">Listings with images are much more likely to get leads. </p>
                {this.state.url?<img src={this.state.url} style={{'width':'100px'}}></img>:null}
                <form onSubmit={this.handleFireBaseUpload}>
                  <div class="custom-file" onChange={this.handleImageAsFile} style={{"margin-top": "10px"}}>
                    <input type="file" class="custom-file-input" id="customFile"></input>
                    <label class="custom-file-label" for="customFile">{this.state.imageName}</label>
                  </div>
                  {/* <input type="submit" value="Upload" class="btn btn-primary" style={{"margin-top": "10px"}}/> */}
                </form>
              </div>
            </div>
          </div>
          <div class="col-sm-8">
            <div class="card shadow" style={{"width": "100%", "margin-top": "10px"}}>
              <form onSubmit={this.handleSubmit}>
                <div class="card-body">
                  <h5 class="card-title">Property Details</h5>
                  <h6 class="card-subtitle mb-2 text-muted">Please enter more details regarding your property listing. </h6>
                  <div class="form-group">
                    <label for="postalcode">Postal Code</label>
                    <input onChange={this.handleChange} value={this.state.postal} type="number" class="form-control" name="postal" placeholder="Enter Postal Code"></input>
                    {/* <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small> */}
                  </div>
                  <div class="form-group">
                    <label for="street">Street Name</label>
                    <input onChange={this.handleChange} value={this.state.street} type="text" class="form-control" name="street" placeholder="Enter Street Name"></input>
                  </div>
                  <div class="form-group">
                    <label for="price">Price</label>
                    <div class="input-group">
                      <div class="input-group-prepend">
                        <span class="input-group-text" id="basic-addon1">$</span>
                      </div>
                      <input onChange={this.handleChange} value={this.state.price} type="number" class="form-control" name="price" placeholder="Enter Price"></input>
                    </div>
                  </div>
                  <div class="form-group">
                    <label for="street">Description</label>
                    <input onChange={this.handleChange} value={this.state.description} type="text" class="form-control" name="description" placeholder="Enter Description"></input>
                  </div>
                  <input type="submit" value="Submit" class="btn btn-primary"/>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    //   <div className="search-container">
    //   <GoogleMap
    //   bootstrapURLKeys={{ key: API_KEY, libraries:'places'}}
    //   defaultCenter={[1.3521, 103.8198]}
    //   defaultZoom={15}
    //   yesIWantToUseGoogleMapApiInternals
    //   onGoogleApiLoaded={({ map, maps }) => this.apiHasLoaded(map, maps)}
    //   >
    //     {apiReady && <Component.SearchBox
    //       map={map}
    //       maps={maps}
    //     />}
    //   </GoogleMap>
    // </div>
    );
  }
}

export default Create