import styled from "styled-components";
import Chats from "./Chats";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import { auth, db } from "../firebase";

import Header from "./Header";
import SearchBar from "./SearchBar";
import SidebarButton from "./SidebarButton";

const Sidebar = () => {
  const [user] = useAuthState(auth);

  const userChatsRef = db
    .collection("chats")
    .where("users", "array-contains", user.email); // returns every chats where users field is an array that contains user.email

  const [chatsSnapshot] = useCollection(userChatsRef);

  return (
    <Container>
      <Header user={user} />
      <SearchBar />
      <SidebarButton user={user} db={db} chatsSnapshot={chatsSnapshot} />
      <Chats chatsSnapshot={chatsSnapshot} user={user} />
    </Container>
  );
};

export default Sidebar;

const Container = styled.div`
  flex: 0.3;
  height: 100vh;
  border-right: 1px solid whitesmoke;
  min-width: 300px;
  max-width: 350px;
  overflow-y: scroll;

  ::-webkit-overflow-scroll {
    display: none;
  }

  -ms-overflow-style: none;
  scrollbar-width: none;
`;
