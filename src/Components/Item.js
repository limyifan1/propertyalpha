import React, {PropTypes} from 'react';
import '../App.css';
export class Item extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
      let blurb;
      
      return (
        <div>
            <div class="card mb-3" style={{"max-width": "50%", "min-height":"220px"}}>
                <div class="row no-gutters">
                    <div class="col-md-4">
                        <img src={this.props.pic} class="card-img card-img-top"></img>
                    </div>
                    <div class="col-md-8">
                        <div class="card-body">
                            <h5 class="card-title">{this.props.street}</h5>
                            <p class="card-text font-weight-bold">{this.props.price}</p>
                            <p class="card-text"><small>{this.props.summary}</small></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      )
  }
}

  export default Item