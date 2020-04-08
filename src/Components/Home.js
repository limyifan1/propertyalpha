import React, {PropTypes} from 'react';
import Component from '../Components'

export class Home extends React.Component {
    render() {
      return (
        <div class="jumbotron">
          <div class="container" style={{"margin-top":"57px"}}>
              <div class="row">
                <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3"> </div>
                <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6" style={{"textAlign":"center"}}>
                  <h1>Find Your Perfect Home</h1><br/>
                  <Component.Search/>
                </div>
                <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3"></div>
              </div>
            </div>
        </div>
      );
    }
  }

  export default Home