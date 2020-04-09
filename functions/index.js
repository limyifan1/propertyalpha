var admin = require("firebase-admin");
var functions = require("firebase-functions")
const cors = require('cors')({
  origin: true,
});

admin.initializeApp(functions.config().firebase);


// exports.search = functions.https.onRequest(async (req, res) => {
//         let longitude = req.body.longitude;
//         var result = []
//         await admin.app().firestore().collection("properties").get().then(snapshot=>{
//             snapshot.forEach((doc) => {
//               if (doc.exists){
//                 result.push(doc.data())
//               } 
//             });
//             console.log("Fetched successfully!")
//             console.log("Result:",longitude)
//             res.status(200).send(result)
//             return true
//           }
//         ).catch(error => {
//           console.log(error)
//           res.send(error)
//           }
//         )
// });


exports.search = functions.https.onRequest(async (req, res) => {
  switch(req.method){
    case 'GET':
      return cors(req, res, async () => {
        let longitude = req.body.longitude;
        var result = []
        await admin.app().firestore().collection("properties").get().then(snapshot=>{
            snapshot.forEach((doc) => {
              if (doc.exists){
                result.push(doc.data())
              } 
            });
            console.log("Fetched successfully!")
            console.log("Result:",longitude)
            res.status(200).send(result)
            return true
          }
        ).catch(error => {
          console.log(error)
          res.send(error)
          }
        )
      });
    default:
      res.status(405).send({error: 'Something blew up!'});
      break;
  }
  return false
});
