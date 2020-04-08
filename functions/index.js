const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();
const db = admin.firestore();

// Take the text parameter passed to this HTTP endpoint and insert it into the
// Realtime Database under the path /messages/:pushId/original
// exports.addMessage = functions.https.onRequest(async (req, res) => {
//     // Grab the text parameter.
//     const original = req.query.text;
//     // Push the new message into the Realtime Database using the Firebase Admin SDK.
//     const snapshot = await db.collection("messages").add({original:original})
//     // Redirect with 303 SEE OTHER to the URL of the pushed object in the Firebase console.
//     res.send("Document written with ID: " + snapshot.id);
//   });

exports.search = functions.https.onRequest(async (req, res) => {
    const original = req.query.text;
    var result = []
    db.collection("properties").get().then(snapshot=>{
        snapshot.forEach((doc) => {
          if (doc.exists){
            result.push(doc.data())
          }
        });
        res.send(result)
        return true
      }
    ).catch(error => {
        res.send(error)
      }
    )
  });
