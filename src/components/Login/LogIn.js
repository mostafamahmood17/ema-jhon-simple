import React, { useState } from 'react';
import { useContext } from 'react';
import {UserContext} from  "../../App.js"
import { useHistory, useLocation } from 'react-router-dom';
import {initializeLoginFramework, handleGoogleSignIn, handleSignOut, handleFBLogin, createUserWithEmailAndPassword, signInWithEmailAndPassword} from  "./loginManager.js"


function LogIn() {

    const logInStyle={
        textAlign:"center",
        backgroundColor:"#FF7F00",
        height:"60vh",
        margin:"100px", 
        padding:"5px",
        border:"1px solid black",
        wordWrap:"wrap",
        overflow:"hidden"
    };

    initializeLoginFramework();
  
  const [newUser, setNewUser] = useState(false)
  const [user, setUser] = useState({
    isSignedIn:false,
    name:'',
    email:'',
    photo:'',
    password:'',
  });

const [loggedInUser, setLoggedInUser] = useContext(UserContext); //4
const history = useHistory();
const location = useLocation();

let { from } = location.state || { from: { pathname: "/" } };

const googleSignIn = () => {
    handleGoogleSignIn()
    .then(res => {
        handleResponse(res, true)
    })
}

const signOut = () => {
    handleSignOut()
    .then(res => {
        handleResponse(res, false)
    })
}

const fBLogin = () => {
    handleFBLogin()
    .then(res => {
        handleResponse(res, true)

    })

}

const handleResponse = (res, redirect) => {
        setUser(res);
        setLoggedInUser(res);
        if(redirect){
            history.replace(from);

        }

}

  const handleBlur = (e) =>{
    // debugger;
    let isFieldValid = true;
    
    // console.log(e.target.name, e.target.value);
    if(e.target.name === 'email'){
      isFieldValid = /\S+@\S+.\S+/.test(e.target.value)
      console.log(isFieldValid)
    }
    if(e.target.name === "password"){
      const isPasswordValid = e.target.value.length > 6;
      const passwordHasNumber =  /\d{1}/.test(e.target.value)
      isFieldValid = isPasswordValid && passwordHasNumber
    }
    if(isFieldValid){
      // [...cart, newItem]
      const newUserInfo = {...user};
      newUserInfo[e.target.name] = e.target.value;
     setUser(newUserInfo)
    }

  }

  const handleSubmit = (e)=>{
    console.log(user.email , user.password)
   if (newUser && user.email && user.password){
       createUserWithEmailAndPassword(user.name, user.email, user.password)
       .then(res => {
        handleResponse(res, true)
       })
   }

   if (!newUser && user.email && user.password){
       signInWithEmailAndPassword(user.email, user.password)
       .then(res => {
        setUser(res);
        handleResponse(res, true)
       })
   }
      e.preventDefault();
  }

 
  return (
    <div style={logInStyle}>
      {
        user.isSignedIn?
        <button onClick={signOut}>Sign out</button> :
        <button onClick={googleSignIn}>Sign in</button>
      }
      <br/>
      <button onClick={fBLogin}>log in using fb</button>
      {
        user.isSignedIn && 
        <div>
          <h1> welcome {user.name}</h1>
           <p>welcome your {user.email}</p>
           <img src={user.photo} alt=""/>
        </div>
      }

      <h1>Our own logIn system</h1>
      {/* <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
      <p>Password: {user.password}</p> */}
      <input type="checkbox" onChange={()=> setNewUser(!newUser)} name="newUser" id=""/>
      <label htmlFor="newUser">new user sign up</label>
      <form onSubmit={handleSubmit}>
        {newUser && <input type="text" name="name" onBlur={handleBlur} placeholder="your name" required/>}
        <br/>
        <input type="text" name="email" onBlur={handleBlur} placeholder="Your Email address" required/>
       <br/>
       <input type="password" name="password" onBlur={handleBlur} placeholder="Your password" required/>
       <br/>
       <input type="submit" value={newUser? 'sign up' : 'sign in'}/>
      </form>
      <p style={{color:"red"}}>{user.error}</p>
      {user.success && <p style={{color:"green"}}>user {newUser ? "created" : "logged in"} successfully</p>}
    </div>
  );
}

export default LogIn;
