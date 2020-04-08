import React, {PropTypes, Fragment, useState} from 'react';
import '../App.css';
import {Typeahead} from 'react-bootstrap-typeahead';
// import {FormGroup, Form} from 'react-bootstrap'
import {db} from './Firestore'
import {Spinner} from 'react-bootstrap'
import logo from '../mrt_logo.png';


function titleCase(str) {
  var splitStr = str.toLowerCase().split(' ');
  for (var i = 0; i < splitStr.length; i++) {
      // You do not need to check if i is larger than splitStr length, as your for does that for you
      // Assign it back to the array
      splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);     
  }
  // Directly return the joined string
  return splitStr.join(' '); 
}

export class Search extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      selected: [],
    };
  }

  componentWillMount() {
    this.getFirestoreData();
  }

  async getFirestoreData() {
    let fireData = await this.retrieveData();
    let data = []
    fireData.forEach(function(doc){
      if (doc.exists){
        var d = doc.data()
        d.name = titleCase(doc.data().name.toLowerCase().slice(0,-12))
        data.push(d)
      }
    });
    data = data.sort(function(a,b){
      var x = a.name.toLowerCase();
      var y = b.name.toLowerCase();
      return x < y ? -1 : x > y ? 1 : 0;
    })
    console.log(data)
    this.setState({data:data})
  }

  retrieveData = () => {
    return db.collection("mrt").get().then(function(querySnapshot) {
      return querySnapshot
    }).catch(function(error) {
      console.log("Error getting document:", error);
    });
  }

  _renderMenuItemChildren = (option,props,index) => {
      return (
        <div>
          <div class="row">
            <div class="col-xs-1 col-sm-1 col-md-1 col-lg-1">
              <img style={{"width":"20px"}} src={logo} alt="logo"/>
            </div>
            <div class="col-xs-1 col-sm-1 col-md-1 col-lg-1">
              <div>{option.name}</div>
            </div>
            <div class="col-xs-10 col-sm-10 col-md-10 col-lg-10">
            </div>
          </div>
        </div>
      )
  }

  searchBox () {
    return (<Fragment>
    <Typeahead
    id="basic-typeahead-example"
    labelKey="name"
    onChange={(selected) => {
      this.setState({selected:selected});
    }}
    options={this.state.data}
    placeholder="Search By MRT"
    selected={this.state.selected}
    renderMenuItemChildren={this._renderMenuItemChildren}
    />
    </Fragment>)
  }

  render() {
      return (
        <div>
            {this.searchBox()}
        </div>
      )
  }
}

  export default Search