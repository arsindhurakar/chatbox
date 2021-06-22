import styled from "styled-components";

import Chat from "./Chat";
import { getRecipientEmail } from "../utils";

const Chats = ({ chatsSnapshot, user }) => {
  return (
    <Container>
      {chatsSnapshot?.docs.map((chat) => (
        <Chat
          key={chat.id}
          id={chat.id}
          user={getRecipientEmail(chat.data().users, user)}
        />
      ))}
    </Container>
  );
};

export default Chats;

const Container = styled.div`
  margin-top: 10px;
`;

// import styled from "styled-components";

// import Chat from "./Chat";
// import Loading from "./Loading";
// import { getRecipientEmail } from "../utils";

// const Chats = ({ chatsSnapshot, user }) => {
//   return (
//     <Container>
//       {chatsSnapshot ? (
//         chatsSnapshot.docs.map((chat) => (
//           <Chat
//             key={chat.id}
//             id={chat.id}
//             user={getRecipientEmail(chat.data().users, user)}
//           />
//         ))
//       ) : (
//         <Loading minor />
//       )}
//     </Container>
//   );
// };

// export default Chats;

// const Container = styled.div`
//   margin-top: 10px;
// `;
