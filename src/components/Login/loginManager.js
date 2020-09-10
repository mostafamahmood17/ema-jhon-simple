import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';

export const initializeLoginFramework = () => {
    // firebase.initializeApp(firebaseConfig)};

    if (firebase.apps.length===0) {
        firebase.initializeApp(firebaseConfig);
     }
    }

     export const handleGoogleSignIn = ()=>{
        const provider = new firebase.auth.GoogleAuthProvider();
        return firebase.auth().signInWithPopup(provider)
        .then(res => {
          const {displayName, photoURL, email} = res.user;
          const signedInUser = {
            isSignedIn:true,
            name:displayName,
            photo:photoURL,
            email:email,
            success:true
          }
          return signedInUser;
        
        })
        .catch(err => {
          console.log(err);
          console.log(err.massage);
    
        })
      }

export const handleFBLogin = () =>{
        const fbProvider = new firebase.auth.FacebookAuthProvider();
     return firebase.auth().signInWithPopup(fbProvider)
      .then(function(result) {
        var token = result.credential.accessToken;
        var user = result.user;
        user.success = true;
        return user;
      }).catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        var email = error.email;
        var credential = error.credential;
      });
    }

export const handleSignOut = ()=>{
       return firebase.auth().signOut()
        .then(res=> {
          const signOutUser ={
            isSignedIn:false,
            name:'',
            email:'',
            photo:'',
            password:"",
            error:"",
            success: false
          }
          return signOutUser;
        })
        .catch(err => console.log(err))
      }
 
      export const createUserWithEmailAndPassword = (name, email, password) => {
       return firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(res => {
         const newUserInfo = res.user;
         newUserInfo.error = "";
         newUserInfo.success =true;
         updateUserName(name) ;
         return newUserInfo;
    
        })
        .catch(error => {
          const newUserInfo = {}
          newUserInfo.success =false;
          newUserInfo.error=error.message
          return newUserInfo;
        });
      }

      export const signInWithEmailAndPassword = (email, password) => {
        return firebase.auth().signInWithEmailAndPassword(email, password)
        .then(res=>{
          const newUserInfo=res.user;
         newUserInfo.error = "";
         newUserInfo.success =true
         return newUserInfo;
         
         console.log("Sign in user info" , res.user)
        })
         .catch(error=> {
          const newUserInfo = {}
          newUserInfo.success =false;
          newUserInfo.error=error.message
          return newUserInfo;
         
        });
      }

      const updateUserName = name=>{
        var user = firebase.auth().currentUser;
    
        user.updateProfile({
          displayName: name,
          // you can update more info
        }).then(()=> {
          console.log('user name updated successfully')
        }).catch(error => {
          console.log(error)

        });
      }





