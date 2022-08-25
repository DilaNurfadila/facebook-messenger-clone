import React, { useEffect, useState } from "react";
import { FormControl, Input, IconButton } from "@mui/material";
import "./App.css";
import Message from "./Message";
import db from "./firebase";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import FlipMove from "react-flip-move";
import SendIcon from "@mui/icons-material/Send";

function App() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [username, setUsername] = useState("");

  // useState = variable in REACT
  // useEffect = run code on a condition in REACT

  useEffect(() => {
    // run once when the app component loads
    db.collection("messages")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setMessages(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            message: doc.data(),
          }))
        );
      });
  }, []);

  useEffect(() => {
    // run code here...
    // if its blank inside [], this code runs ONCE when the app component loads
    // if we have a variable like input, it runs every time input changes
    // const username = prompt('Please enter your name')
    setUsername(prompt("Please enter your name"));
  }, []); // condition

  // console.log(input);
  // console.log(messages);

  const sendMessage = (event) => {
    event.preventDefault();

    db.collection("messages").add({
      message: input,
      username: username,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });

    // all the logic to send a message goes
    // setMessages([...messages, { username: username, message: input }]);
    setInput("");
  };

  return (
    <div className="App">
      <img
        src="https://articles-images.sftcdn.net/wp-content/uploads/sites/2/2014/09/facebook-messenger-11-100x100-100x100.png"
        alt="Messenger logo"
      />
      <h1>Hello World</h1>
      <h2>Welcome {username}</h2>

      <form className="app__form">
        <FormControl className="app__formControl">
          {/* Input field */}
          {/* <InputLabel>Enter a message</InputLabel> */}
          <Input
            className="app__input"
            placeholder="Enter a message"
            value={input}
            onChange={(event) => setInput(event.target.value)}
          />

          {/* Button */}
          <IconButton
            className="app__iconButton"
            variant="contained"
            color="primary"
            type="submit"
            onClick={sendMessage}
            disabled={!input}
          >
            <SendIcon />
          </IconButton>

          {/* <Button
            variant="contained"
            color="primary"
            type="submit"
            onClick={sendMessage}
            disabled={!input}
          >
            Send Message
          </Button> */}
        </FormControl>
      </form>

      <FlipMove className="text_message">
        {/* Messeges themselves */}
        {messages.map(({ id, message }) => (
          <Message key={id} username={username} message={message} />
          // <p>{message}</p>
        ))}
      </FlipMove>
    </div>
  );
}

export default App;
