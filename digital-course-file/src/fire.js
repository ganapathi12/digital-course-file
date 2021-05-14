import firebase from 'firebase'
import "firebase/auth"
import "firebase/firestore"
import "firebase/storage"

// Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyDQlGeHoJnRw9RifLkHWoZj2MRiPwZYuss",
    authDomain: "se-project-c93ee.firebaseapp.com",
    projectId: "se-project-c93ee",
    storageBucket: "se-project-c93ee.appspot.com",
    messagingSenderId: "1002598702310",
    appId: "1:1002598702310:web:d89b9904b9159331366f27"
  };


  // Initialize Firebase
  const fire=firebase.initializeApp(firebaseConfig);

  // For folder
  const firestore = fire.firestore();
  export const database = {
    folders : firestore.collection('folders'),
    files : firestore.collection('files'),
    a_folders :  firestore.collection('a_folders'),
    a_files : firestore.collection('a_files'),
    s_details : firestore.collection('s_details'),
    feedback : firestore.collection('feedback'),
    getTime : firebase.firestore.FieldValue.serverTimestamp,
    formatDoc : doc => { return {id : doc.id, ...doc.data()} },
  }
  export const storage = fire.storage()
  export const auth = fire.auth()
  export default fire;
