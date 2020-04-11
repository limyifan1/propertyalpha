import React from 'react';
import '../App.css';
import Component from '../Components'
import queryString from 'query-string';
import {Spinner} from 'react-bootstrap'

export class Listing extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      query: queryString.parse(this.props.location.search).query,
      longitude: queryString.parse(this.props.location.search).lon,
      latitude: queryString.parse(this.props.location.search).lat,
      distance: queryString.parse(this.props.location.search).distance,
      retrieved: false
    };
  }

  componentWillMount() {
    this.getFirestoreData();
  }

  getData(val){
    this.setState({data:val})
  }

  retrieveData = async () => {
    let string = {
      longitude:this.state.longitude,
      latitude:this.state.latitude,
      query:this.state.query,
      distance:this.state.distance
    }
    console.log(string)
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
    // console.log(data)
    this.setState({data:data})
    this.setState({retrieved:true})
  }

  // setData(result) {
  //   this.setState({data: result.data});
  //   this.props.sendData(result.data)
  // }


  render() {
    return (
      
      <div>
        {this.state.retrieved ?
          <div>
            <Component.Sidebar data={this.state}/>
            <Component.Maps data={this.state}/>
          </div>
        :
          <div class="row h-100 map-container">
            <div class="col-sm-12 my-auto">
              <Spinner class="" animation="grow" />
            </div>
          </div>
        }
      </div>
    );
  }
}

export default Listing