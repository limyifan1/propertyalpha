import React, {PropTypes} from 'react';
import db from './Firestore'


const addData = () => {
  db.collection("properties").add({
    first: "Ada",
    last: "Lovelace",
    born: 1815
  })
  .then(function(docRef) {
      console.log("Document written with ID: ", docRef.id);
      alert("Sent")
  })
  .catch(function(error) {
      console.error("Error adding document: ", error);
      alert("Failed")
  });
}

export class Home extends React.Component {
    render() {
      return (
        <div>
          <br>
          </br>
          <br>
          </br>
          <div>
            HOMEEEE
            {addData()}
          </div>
        </div>
      );
    }
  }

  export default Home