import React, {PropTypes} from 'react';
import '../App.css';
import Item from './Item'

export class Sidebar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
        data: []
    };
  }

  render() {
    let result;
    if (this.props.data.data.length != 0){
      result = this.props.data.data.map(data => {
        return (
          <div>
            <Item 
              street={data['street']}
              pic={data['picture_url']}
              price={data['price']}
              summary={data['summary']}
            />
          </div>
        )
      })
    }

    return (
      <div>
        <div style={{"padding-top":"56px", width:"100%"}}>
          {result}
        </div>
      </div>
    );
  }
}

  export default Sidebar