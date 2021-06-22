import styled from "styled-components";
import { Avatar, IconButton } from "@material-ui/core";
import ChatIcon from "@material-ui/icons/Chat";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { auth } from "../firebase";

const Header = ({ user }) => {
  return (
    <Container>
      <UserContainer>
        <UserAvatar onClick={() => auth.signOut()} src={user.photoURL} />
        <p>{user.displayName}</p>
      </UserContainer>
      <IconsContainer>
        <IconButton>
          <ChatIcon />
        </IconButton>
        <IconButton>
          <MoreVertIcon />
        </IconButton>
      </IconsContainer>
    </Container>
  );
};

export default Header;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  top: 0;
  border-bottom: 1px solid whitesmoke;
  padding: 10px;
  background-color: white;
  z-index: 100;
  height: 90px;
`;

const UserAvatar = styled(Avatar)`
  cursor: pointer;
  margin-right: 10px;

  :hover {
    opacity: 0.9;
  }
`;

const UserContainer = styled.div`
  display: flex;
  align-items: center;
`;

const IconsContainer = styled.div``;
