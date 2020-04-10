import React, {PropTypes, Fragment, useState} from 'react';
import '../App.css';
import {Typeahead} from 'react-bootstrap-typeahead';
import {InputGroup, Button, FormControl} from 'react-bootstrap'
import {db} from './Firestore'
import logo from '../mrt_logo.png';
import {
	withRouter
} from 'react-router-dom';

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
    let current = new Set()
    fireData.forEach(function(doc){
      if (doc.exists){
        var d = doc.data()
        d.name = titleCase(doc.data().name.toLowerCase().slice(0,-12))
        if (!current.has(d.name)){
          data.push(d)
          current.add(d.name)
        }
      }
    });
    data = data.sort(function(a,b){
      var x = a.name.toLowerCase();
      var y = b.name.toLowerCase();
      return x < y ? -1 : x > y ? 1 : 0;
    })
    this.setState({data:data})
  }

  retrieveData = async () => {
    try {
      const querySnapshot = await db.collection("mrt").get();
      return querySnapshot;
    }
    catch (error) {
      console.log("Error getting document:", error);
    }
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
      console.log(selected)
      this.setState({selected});
    }}
    options={this.state.data}
    placeholder="Search By MRT"
    selected={this.state.selected}
    renderMenuItemChildren={this._renderMenuItemChildren}
    />
    </Fragment>)
  }

  handleClick = (event) => {
    event.preventDefault();
    this.props.history.push({
      pathname: '/listing',
      search: '?query='+this.state.selected[0].name+'&lon='+this.state.selected[0].coords[0]+'&lat='+this.state.selected[0].coords[1],
      // state: { detail: response.data }
    })
    // this.props.history.push('/listing')
  }

  handleSubmit = (event) => {
    event.preventDefault();
    alert("You selected: "+this.state.selected[0].name)
  }

  render() {
      return (
        <form onSubmit={this.handleSubmit}>
          <div class="row">
            <div class="col-xs-1 col-sm-1 col-md-1 col-lg-1">
            </div>
            <div class="col-xs-10 col-sm-10 col-md-10 col-lg-10">
              <InputGroup className="">
                <div style={{"width":"80%"}}>
                  {this.searchBox()}
                </div>
                <InputGroup.Append style={{"width":"20%"}}>
                  <Button type="submit" variant="outline-secondary" onClick={this.handleClick}>Search</Button>
                </InputGroup.Append>
              </InputGroup>
            </div>
            <div class="col-xs-1 col-sm-1 col-md-1 col-lg-1">
                      {/* {this.state.selected.length > 0?this.state.selected[0].name:null} */}
            </div>
          </div>
        </form>
      )
  }
}

  export default withRouter(Search)