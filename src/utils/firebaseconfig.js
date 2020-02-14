import * as firebase from 'firebase'



var config = {
    apiKey: "AIzaSyAsgmrnmHGOTiFoYnFjrfkizD7cs14tNQw",
    authDomain: "web1-7fce9.firebaseapp.com",
    databaseURL: "https://web1-7fce9.firebaseio.com",
    projectId: "web1-7fce9",
    storageBucket: "web1-7fce9.appspot.com",
    messagingSenderId: "320298095238"
  };
  const firebaseApp = firebase.initializeApp(config);

export default firebaseApp;