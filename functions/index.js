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
  return cors(req, res, async () => {
    let lng = req.body.longitude;
    let lat = req.body.latitude;
    let loc = req.body.query;
    var result = []
    await admin.app().firestore().collection("properties").get().then(snapshot=>{
        snapshot.forEach((doc) => {
          if (doc.exists){
            result.push(doc.data())
          } 
        });
        console.log("Fetched successfully!")
        console.log(lng,lat, loc)
        res.setHeader('Access-Control-Allow-Origin', '*')
        res.status(200).send(result)
        return true
      }
    ).catch(error => {
      console.log(error)
      res.status(405).send(error)
      }
    )
  });
});
