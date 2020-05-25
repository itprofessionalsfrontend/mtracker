import * as firebase from 'firebase';

  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyDyzsJppxkXXmyGwk8nVbxa0L9m-nBSXlA",
    authDomain: "mtracker-45d55.firebaseapp.com",
    databaseURL: "https://mtracker-45d55.firebaseio.com",
    projectId: "mtracker-45d55",
    storageBucket: "mtracker-45d55.appspot.com",
    messagingSenderId: "527774111367",
    appId: "1:527774111367:web:b56598e5b7fed0a6e30a22"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

export default firebase;