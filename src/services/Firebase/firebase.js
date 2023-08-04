import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

const config = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_DATABASE_URL,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
};

class Firebase {
    constructor() {
      app.initializeApp(config);

      this.auth = app.auth();

      /* DB */
      this.db = app.firestore();
      this.userRef = this.db.collection('user');
      this.bbqRef = this.db.collection('bbq');
    }

    /** Email / Password User Creation */
    doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password)

    /** BBQ Creation */
    doCreateBBQInDB = (bbqObj) => 
      this.bbqRef.add(bbqObj);

    /** BBQ Query */
    searchBBQInDBByUid = (uid) => this.bbqRef.where("userId", "==", uid).get().then(async (snapshot) => {
        let docArray = [];
        await snapshot.forEach(doc => {
          let obj = {
            id: doc.id,
            data: doc.data()
          }
          docArray.push(obj);
        });
        return docArray;
    });

    /** BBQ Update */
    doUpdateBBQInDB = (id, body) => 
      this.bbqRef.doc(id).update(body);

    /** BBQ Delete */
    deleteBBQInDBById = (id) => 
      this.bbqRef.doc(id).delete();


    /** Email / Password User Login */
    doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

    /** Signout */
    doSignOut = () => this.auth.signOut();

    /** Password Reset */
    doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

    /** Password Update */
    doPasswordUpdate = password =>
        this.auth.currentUser.updatePassword(password);

    /** Storage */
    getStorage = () => app.storage().ref();

}
  
  export default Firebase;