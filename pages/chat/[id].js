import Head from "next/head";
import styled from "styled-components";
import Sidebar from "../../components/Sidebar";
import ChatScreen from "../../components/ChatScreen";
import { db } from "../../firebase";

const ChatBox = ({ messages, chat }) => {
  return (
    <Container>
      <Head>
        <title>ChatBox</title>
      </Head>
      <Sidebar />
      <ChatContainer>
        <ChatScreen messages={messages} chat={chat} />
      </ChatContainer>
    </Container>
  );
};

export default ChatBox;

export const getServerSideProps = async (context) => {
  const ref = db.collection("chats").doc(context.query.id);

  //PREP the messages
  const messagesRes = await ref
    .collection("messages")
    .orderBy("timestamp", "asc")
    .get();

  const messages = messagesRes.docs
    .map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))
    .map((messages) => ({
      ...messages,
      timestamp: messages.timestamp.toDate().getTime(),
    }));

  //PREP the chats
  const chatRes = await ref.get();
  const chat = {
    id: chatRes.id,
    ...chatRes.data(),
  };

  return {
    props: {
      messages: JSON.stringify(messages),
      chat,
    },
  };
};

const Container = styled.div`
  display: flex;
`;

const ChatContainer = styled.div`
  overflow: scroll;
  height: 100vh;
  flex: 1;

  ::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none; //IE and Edge
  scrollbar-width: none; //Firefox
`;

//PREP the messages
//  const messagesRes = await ref
//  .collection("messages")
//  .orderBy("timestamp", "asc")
//  .get();

// const messages = messagesRes.docs
//  .map((doc) => ({
//    id: doc.id,
//    ...doc.data(),
//  }))
//  .map((messages) => ({
//    ...messages,
//    timestamp: messages.timestamp.toDate().getTime(),
//  }));

// //PREP the chats
// const chatRes = await ref.get();
// const chat = {
//  id: chatRes.id,
//  ...chatRes.data(),
// };

// return {
//  props: {
//    messages: JSON.stringify(messages),
//    chat,
//  },
// };
// };
