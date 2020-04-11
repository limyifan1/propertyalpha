import React, {PropTypes} from 'react';
import Component from '../Components'

export class Home extends React.Component {
    render() {
      return (
        <div>
          <div class="jumbotron" style={{"background-color":"white", "height":"300px"}}>
            <div class="container" style={{"margin-top":"57px"}}>
                <div class="row">
                  <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3"> </div>
                  <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6" style={{"textAlign":"center"}}>
                    <h1 style={{"color":"#B22222"}}>Find Your Perfect Home</h1><br/>
                    <Component.Search/>
                  </div>
                  <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3"></div>
                </div>
              </div>
          </div>
          
          <div class="jumbotron row" style={{"background-color":"#B22222", "height":"350px"}}>
            <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2"></div>
            <div class="col-xs-8 col-sm-8 col-md-8 col-lg-8">
              <h2 style={{"color":"white","textAlign":"center"}}>A Better Way To Find Your Next Home</h2>
            </div>
            <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2"></div>
          </div>
          
        </div>
      );
    }
  }

  export default Home