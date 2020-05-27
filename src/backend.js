import firebase from 'firebase'
import 'firebase/firestore'

//backend setup
const config = {
  apiKey: "AIzaSyDyZ_QMDOFYLMHDfsm9zOszFwYf399uwdI",
  authDomain: "nusocial-7c7e8.firebaseapp.com",
  databaseURL: "https://nusocial-7c7e8.firebaseio.com",
  projectId: "nusocial-7c7e8",
  storageBucket: "nusocial-7c7e8.appspot.com",
  messagingSenderId: "691432966606",
  appId: "1:691432966606:web:bc942ec314fd281f75039f",
  measurementId: "G-BTTJ0DQ2FR"
};
firebase.initializeApp(config)

// firebase utils
const db = firebase.firestore()
const auth = firebase.auth()
const currentUser = auth.currentUser
auth.setPersistence(firebase.auth.Auth.Persistence.SESSION)
  .catch(function(error) {
    // Handle Errors here.
    console.log(error.code);
    console.log(error.message);
  });


// firebase collections
const usersCollection = db.collection('users')
const postsCollection = db.collection('posts')
const commentsCollection = db.collection('comments')
const likesCollection = db.collection('likes')

export {
    db,
    auth,
    currentUser,
    usersCollection,
    postsCollection,
    commentsCollection,
    likesCollection
}