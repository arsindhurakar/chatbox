import styled from "styled-components";
import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import moment from "moment";

const Message = ({ user, message }) => {
  const [userLoggedIn] = useAuthState(auth);

  const TypeOfMessage =
    user === userLoggedIn.email ? SenderMessage : RecieverMessage;

  return (
    <div>
      <TypeOfMessage>
        {message.message}
        <TimeStamp>
          {message.timestamp ? moment(message.timestamp).format("LT") : "..."}
        </TimeStamp>
      </TypeOfMessage>
    </div>
  );
};

export default Message;

const MessageElement = styled.p`
  width: fit-content;
  padding: 6px 10px;
  padding-bottom: 10px;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 300;
  margin: 10px;
  min-width: 60px;
  display: flex;
  flex-direction: column;
`;

const SenderMessage = styled(MessageElement)`
  background-color: #dcf8c6;
  margin-left: auto;
`;

const RecieverMessage = styled(MessageElement)`
  background-color: whitesmoke;
`;

const TimeStamp = styled.span`
  font-size: 12px;
  text-align: right;
  color: gray;
  margin-top: 6px;
`;
