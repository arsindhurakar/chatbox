import styled from "styled-components";
import { Button } from "@material-ui/core";
import * as EmailValidator from "email-validator";

const SidebarButton = ({ user, db, chatsSnapshot }) => {
  const chatAlreadyExists = (recipientEmail) =>
    !!chatsSnapshot?.docs.find(
      //!! -> if returned an element returns true else if returned undefined or null returns false
      (chat) => chat.data().users.find((user) => user === recipientEmail) //?.length > 0
    );

  const handleClick = () => {
    const input = prompt("Search with Email");

    if (!input) return null;

    if (
      EmailValidator.validate(input) &&
      !chatAlreadyExists(input) &&
      input !== user.email
    ) {
      // Added the chat into the DB 'chats' collection if it does not already exist and is valid
      db.collection("chats").add({
        users: [user.email, input],
      });
    } else alert("Failed");
  };

  return <Container onClick={handleClick}>Start a new chat</Container>;
};

export default SidebarButton;

const Container = styled(Button)`
  width: 100%;

  &&& {
    border-top: 1px solid whitesmoke;
    border-bottom: 1px solid whitesmoke;
  }
`;
