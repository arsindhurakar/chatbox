import { useState, useRef } from "react";
import styled from "styled-components";
import { Avatar, IconButton } from "@material-ui/core";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import EmojiEmotionsIcon from "@material-ui/icons/EmojiEmotions";
import { db, auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import { useRouter } from "next/router";
import firebase from "firebase";
import Message from "./Message";
import { getRecipientEmail } from "../utils";
import TimeAgo from "timeago-react";

const ChatScreen = ({ chat, messages }) => {
  const [input, setInput] = useState("");
  const [user] = useAuthState(auth);

  const router = useRouter();

  //-- Move Messages Upward
  const endOfMessagesRef = useRef();

  const scrollToBottom = () => {
    endOfMessagesRef.current.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  //-- Move Messages Upward

  const recipientEmail = getRecipientEmail(chat.users, user);

  const [recipientSnapshot] = useCollection(
    db
      .collection("users")
      .where("email", "==", getRecipientEmail(chat.users, user))
  );
  const recipient = recipientSnapshot?.docs?.[0]?.data();

  const [messagesSnapshot] = useCollection(
    db
      .collection("chats")
      .doc(router.query.id)
      .collection("messages")
      .orderBy("timestamp", "asc")
  );

  const getMessages = () => {
    if (messagesSnapshot) {
      return messagesSnapshot.docs.map((doc) => (
        <Message
          key={doc.id}
          user={doc.data().user}
          message={{
            ...doc.data(),
            timestamp: doc.data().timestamp?.toDate().getTime(),
          }}
        />
      ));
    } else
      JSON.parse(messages).map((message) => (
        <Message key={message.id} user={message.user} message={message} />
      ));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    db.collection("users").doc(user.uid).set(
      {
        lastSeen: firebase.firestore.FieldValue.serverTimestamp(),
      },
      { merge: true }
    );

    db.collection("chats").doc(router.query.id).collection("messages").add({
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      message: input,
      user: user.email,
      photoURL: user.photoURL,
    });
    setInput("");
    scrollToBottom();
  };

  return (
    <Container>
      <Header>
        {recipient ? (
          <UserAvatar src={recipient.photoURL} />
        ) : (
          <UserAvatar>{recipientEmail[0].toUpperCase()}</UserAvatar>
        )}
        <HeaderInfo>
          <p>{recipientEmail}</p>
          {recipientSnapshot ? (
            <p>
              Last active: {""}
              {recipient ? (
                <TimeAgo datetime={recipient?.lastSeen?.toDate()} />
              ) : (
                "Unavailable"
              )}
            </p>
          ) : (
            <p>Loading last active..</p>
          )}
        </HeaderInfo>
        <HeaderIcons>
          <IconButton>
            <AttachFileIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </HeaderIcons>
      </Header>

      <MessageContainer>
        {getMessages()}
        <EndOfMessage ref={endOfMessagesRef} />
      </MessageContainer>

      <InputContainer>
        <IconButton>
          <EmojiEmotionsIcon />
        </IconButton>
        <Input value={input} onChange={(e) => setInput(e.target.value)} />
        <Button hidden disabled={!input} onClick={handleSubmit}>
          Send
        </Button>
      </InputContainer>
    </Container>
  );
};

export default ChatScreen;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const Header = styled.div`
  position: sticky;
  background-color: white;
  z-index: 100;
  top: 0;
  display: flex;
  padding: 11px;
  height: 90px;
  align-items: center;
  border-bottom: 1px solid whitesmoke;
`;

const UserAvatar = styled(Avatar)`
  margin-right: 10px;
`;

const HeaderInfo = styled.div`
  flex: 1;

  > p:first-child {
    line-height: 0.9;
  }

  > p:last-child {
    font-size: 12px;
    color: gray;
    line-height: 0.9;
  }
`;

const HeaderIcons = styled.div``;

const MessageContainer = styled.div`
  background-color: #e5ded8;
  min-height: 70vh;
  overflow-x: hidden;
  padding: 0 15px;

  ::-webkit-overflow-scroll {
    display: none;
  }

  -ms-overflow-style: none;
  scrollbar-width: none;
`;

const InputContainer = styled.form`
  display: flex;
  align-items: center;
  padding: 10px 0;
  position: sticky;
  bottom: 0;
  background-color: white;
  z-index: 1000;
`;

const Input = styled.input`
  flex: 1;
  outline: none;
  border: none;
  border-radius: 10px;
  background-color: #e5ded8;
  padding: 20px;
  margin: 0 15px;
`;

const Button = styled.button``;

const EndOfMessage = styled.div`
  margin-bottom: 80px;
`;
