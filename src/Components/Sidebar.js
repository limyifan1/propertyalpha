import React from 'react';
import '../App.css';
import Item from './Item'

export class Sidebar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
        listing: []
    };

  }

  // loadData = ()=>{
  //   let result = [];
  //   // console.log("Sidebar:",this.props.data.data)
  //   if (this.props.data.data){
  //     this.props.data.data.forEach(function(data) {
  //       result.push(
  //       <div>
  //         <Item 
  //           street={data['street']}
  //           pic={data['url']}
  //           price={data['price']}
  //           summary={data['description']}
  //         />
  //       </div>
  //       )
  //     });
  //   }
  //   return result
  // }

  render() {
    let result = []
    if (this.props.data.data){
      this.props.data.data.forEach(function(data) {
        // console.log(data['url'])
        result.push(
        <div>
          <Item 
            street={data['street']}
            pic={data['url']}
            price={data['price']}
            summary={data['description']}
          />
        </div>
        )
      });
    }
    return (
      <div>
          {result.length > 0 ? 
            <div style={{"paddingTop":"56px", width:"100%"}}>
              {result}
            </div>
            :
            (
              <div class="search-container">
                <div class="row h-100">
                  <div class="col-sm-2 my-auto"></div>
                    <h1 class="col-sm-8 my-auto" style={{"text-align": "center"}}>
                      Sorry, we can't find a result
                    </h1>
                  <div class="col-sm-2 my-auto"></div>
                </div>
              </div>
            )
          }
      </div>
    );
  }
}

  export default Sidebar