const functions = require("firebase-functions");
const cors = require("cors")({ origin: true });
const fs = require("fs");
const UUID = require("uuid-v4");
const { Storage } = require("@google-cloud/storage");
const admin = require("firebase-admin");

const gcconfig = new Storage({
  projectId: "ordinal-tractor-221702",
  keyFilename: "myFirebaseID.json"
});

admin.initializeApp({
  credential: admin.credential.cert(require("./myFirebaseID.json"))
});

exports.storeImage = functions.https.onRequest((request, response) => {
  cors(request, response, () => {
    if (
      !request.headers.authorization ||
      !request.headers.authorization.startsWith("Bearer ")
    ) {
      console.log("No token present!");
      response.status(403).json({ error: "Unauthorized" });
      return;
    }

    let idToken;
    idToken = request.headers.authorization.split("Bearer ")[1];
    admin
      .auth()
      .verifyIdToken(idToken)
      .then(decodedToken => {
        const body = JSON.parse(request.body);
        fs.writeFileSync(
          "/tmp/uploaded-image.jpg",
          body.image,
          "base64",
          err => {
            console.log(err);
            return response.status(500).json({ error: err });
          }
        );
        const bucket = gcconfig.bucket("ordinal-tractor-221702.appspot.com");
        const uuid = UUID();

        bucket.upload(
          "/tmp/uploaded-image.jpg",
          {
            uploadType: "media",
            destination: "/happyPlaces/" + uuid + ".jpg",
            metadata: {
              metadata: {
                contentType: "image/jpeg",
                firebaseStorageDownloadTokens: uuid
              }
            }
          },
          (err, file) => {
            if (!err) {
              response.status(201).json({
                imageUrl:
                  "https://firebasestorage.googleapis.com/v0/b/" +
                  bucket.name +
                  "/o/" +
                  encodeURIComponent(file.name) +
                  "?alt=media&token=" +
                  uuid,
                  imagePath: "/happyPlaces/" + uuid + ".jpg"
              });
            } else {
              console.log(err);
              response.status(500).json({ error: err });
            }
          }
        );
      })
      .catch(error =>{
        console.log("Token is invalid!");
        response.status(403).json({error: "Unauthorized"})
      });
  });
});

exports.deleteImage = functions.database
  .ref("/place/{placeId}")
  .onDelete(event => {
    console.log(event);
    const placeData = event._data;
    const imagePath = placeData.imagePath;

    const bucket = gcconfig.bucket("ordinal-tractor-221702.appspot.com");
    return bucket.file(imagePath).delete();
  });
