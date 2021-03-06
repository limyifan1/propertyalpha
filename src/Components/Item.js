import React, {PropTypes} from 'react';
import '../App.css';
export class Item extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {     
      return (
        <div>
            <div class="item mb-3" style={{"maxWidth": "50%", "minHeight":"100", "maxHeight": "260px"}}>
                <div class="row no-gutters">
                    <div class="col-md-4">
                      {
                        <img src={this.props.pic} class="card-img card-img-top" style={{"maxHeight":"220px"}}/>
                      }
                        
                    </div>
                    <div class="col-md-8" style={{"paddingTop":"0px"}}>
                        <div style={{"padding-left":"15px"}} >
                            <h5 class="card-title">{this.props.street}</h5>
                            <p class="card-text font-weight-bold">${this.props.price}</p>
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