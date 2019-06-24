
## Google-Websocket-Chat
This is a super basic chat application done with ReactJS, NodeJS, Socket.IO, Express, and Firebase for Google authentication.
Feel free to use this for any project I may update the code to make it cleaner it is a bit messy I wanted to do a quick mini project.

## Basic Setup
You need to insert your firebase.js config in the configs folder in order for this project to run otherwise you will not even be able to see chat as being authenticated is required but easily removeable.

## Basic Socket Setup to commuincate with ReactJS

```javascript
  io.on('connection', (socket) => {
    console.log(socket.id);

    socket.on("SEND_CHAT", (data) => {
      io.emit("RECEIVE_CHAT", data);
    })
  });
```
