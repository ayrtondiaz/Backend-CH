const admin = require('firebase-admin')

const serviceAccount = require("../config/backend-coderh-firebase-adminsdk-zdd9o-cc32c3e8ec.json")

//const serviceAccount = JSON.parse(await readFile("./src/config/backend-coderh-firebase-adminsdk-zdd9o-cc32c3e8ec.json"));

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

module.exports = class Container {
  constructor(collection) {
    this.query = this.#db.collection(collection),
    this.lastId = 1
  }

  #db = admin.firestore();

}