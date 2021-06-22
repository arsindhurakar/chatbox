import styled from "styled-components";
import { Avatar } from "@material-ui/core";
import { useCollection } from "react-firebase-hooks/firestore";
import { useRouter } from "next/router";
import { db } from "../firebase";

const Chat = ({ id, user }) => {
  const router = useRouter();

  const recipientRef = db.collection("users").where("email", "==", user);

  const [recipientSnapshot] = useCollection(recipientRef);

  const recipient = recipientSnapshot?.docs?.[0]?.data();

  const chatOpen = () => {
    router.push(`/chat/${id}`);
  };

  return (
    <Container onClick={chatOpen}>
      {recipient ? (
        <>
          <UserAvatar src={recipient.photoURL} />
          <p>{recipient.displayName}</p>
        </>
      ) : (
        <>
          <UserAvatar>{user[0].toUpperCase()}</UserAvatar>
          <p>{user}</p>
        </>
      )}
    </Container>
  );
};

export default Chat;

const Container = styled.div`
  display: flex;
  align-items: center;
  padding: 5px 10px;
  font-size: 14px;
  word-break: break-word;
  font-weight: 300;

  :hover {
    cursor: pointer;
    background-color: whitesmoke;
  }
`;

const UserAvatar = styled(Avatar)`
  margin-right: 12px;
`;
