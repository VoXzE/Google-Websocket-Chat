import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField';
import io from 'socket.io-client';

export default class ChatBox extends Component {

  constructor(props) {
    super(props);
    this.state = {
      message: null,
      messages: []
    }

    this.socket = io('localhost:8080'); 
    
    this.socket.on("RECEIVE_CHAT", (data) => {
      addChatMessage(data);
    });

    const addChatMessage = (data) => {
      this.setState({ messages: [...this.state.messages, data]});
      console.log(this.state.messages);
    }
  }

  handleChange = (event) => {
    this.setState({ message: event.target.value })
  }

  handleSendMessage = (event) => {
    event.preventDefault();
    this.socket.emit("SEND_CHAT", {
      name: this.props.name,
      text: this.state.message,
    });
    this.setState({ message: null })
  }

 

  render() {
    return (
      <div className="chat-box">
        <div className="chat-messages">
          {this.state.messages && this.state.messages.map((message) => (
            <div className="chat-message">
              <h1>{message.name}</h1>
              <p>{message.text}</p>
            </div>
          ))}
        </div>
        <form noValidate autoComplete="off" className="chat-input" onSubmit={this.handleSendMessage}>
          <TextField
            label="Enter chat message"
            className="chat-text"
            onChange={this.handleChange}
            value={this.state.message}
            margin="normal"
          />
        </form>
      </div>
    )
  }
}
