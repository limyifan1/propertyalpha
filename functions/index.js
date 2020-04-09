var admin = require("firebase-admin");
var functions = require("firebase-functions")
admin.initializeApp(functions.config().firebase);

exports.search = functions.https.onRequest(async (req, res) => {
    const original = req.query.text;
    var result = []
    await admin.app().firestore().collection("properties").get().then(snapshot=>{
        snapshot.forEach((doc) => {
          if (doc.exists){
            result.push(doc.data())
          }
        });
        console.log("Fetched successfully!")
        res.send(result)
        return true
      }
    ).catch(error => {
      console.log(error)
      res.send(error)
      }
    )
  });
