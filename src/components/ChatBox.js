import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField';
import io from 'socket.io-client';

export default class ChatBox extends Component {

  constructor(props) {
    super(props);
    this.state = {
      message: null,
      messages: [],
      lastMessage: 0,
    }

    this.socket = io(this.props.socket); 
    
    this.socket.on("RECEIVE_CHAT", (data) => {
      addChatMessage(data);
    });

    const addChatMessage = (data) => {
      this.setState({ messages: [...this.state.messages, data], lastMessage: this.state.lastMessage++});
    }
  }

  handleChange = (event) => {
    this.setState({ message: event.target.value })
  }

  handleSendMessage = (event) => {
    if (!this.state.message) return;
    event.preventDefault();
    this.socket.emit("SEND_CHAT", {
      name: this.props.name,
      text: this.state.message,
      avatar: this.props.avatar,
    });
    this.setState({ message: "" })
  }

 

  render() {
    // return (
    //   <div className="chat-box">
    //     <div className="chat-messages">
    //       {this.state.messages && this.state.messages.map((message) => (
    //         <div className="chat-message" key={this.state.lastMessage}>
    //           {this.props.showAvatars && <img src={message.avatar}/>}
    //           <div>
    //             <h1>{message.name}</h1>
    //             <p>{message.text}</p>
    //           </div>
    //         </div>
    //       ))}
    //     </div>
    //     <form noValidate autoComplete="off" className="chat-input" onSubmit={this.handleSendMessage}>
    //       <TextField
    //         label="Enter chat message"
    //         className="chat-text"
    //         onChange={this.handleChange}
    //         value={this.state.message}
    //         margin="normal"
    //       />
    //     </form>
    //   </div>
    // )
    return (
      <div class="row">
        <div class="panel panel-default">
          <div class="panel-heading">Socket.IO Chat with any auth provider.</div>
            <div class="panel-body">
              <div class="container">
                {this.state.messages && this.state.messages.map((message) => (
                  <div class="row message-bubble" key={this.state.lastMessage}>
                    <p class="text-muted">{message.name}</p>
                    <p>{message.text}</p>
                  </div>
                ))}
              </div>
              <div class="panel-footer">
                  <div class="input-group">
                    <input type="text" class="form-control" onChange={this.handleChange} value={this.state.message}/>
                    <span class="input-group-btn">
                      <button class="btn btn-default" type="button" onClick={this.handleSendMessage}>Send</button>
                    </span>
                  </div>
              </div>
            </div>
        </div>
    </div>
    )
  }
}
