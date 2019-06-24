import React, { Component } from 'react'
import fire from './configs/firebase';
import './assets/App.css';
import firebase from 'firebase'
import ChatBox from './components/ChatBox';

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      user: null,
      loading: true,
    }
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user })
        console.log(user);
      }
      this.setState({loading: false })
    });
  }

  handleSignIn = () => {
    // Using a popup.
    var provider = new firebase.auth.GoogleAuthProvider()
    provider.addScope('profile');
    provider.addScope('email');
    fire.auth().signInWithPopup(provider).then(function (result) {
      console.log("Logged in")
    });
  }

  handleSignOut = () => {
    firebase.auth().signOut().then(function () {
      console.log('Signed Out');
      window.location.reload();
    }, function (error) {
      console.error('Sign Out Error', error);
    });
  }
  

  render() {
    const { user, loading } = this.state;

    if (loading) {
      return (
        <h1>Loading...</h1>
      )
    }
    return (
      <div className="App">
        {/* {user && user.displayName} */}
        {user && <ChatBox name={user.displayName}/>}
        <button onClick={this.handleSignIn}>Sign In</button>
        <button onClick={this.handleSignOut}>Sign Out</button>
      </div>
    )
  }
}
