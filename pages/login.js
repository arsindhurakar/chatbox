import Head from "next/head";
import styled from "styled-components";
import { Button } from "@material-ui/core";
import { auth, provider } from "../firebase";

const Login = () => {
  const handleSignIn = () => {
    auth.signInWithPopup(provider).catch(alert);
  };

  return (
    <Container>
      <Head>
        <title>Login</title>
      </Head>
      <LoginContainer>
        <Logo
          // src="https://image.freepik.com/free-vector/chat-logo-design_93835-108.jpg"
          src="https://i.pinimg.com/originals/ed/94/07/ed9407c718bd574ed3cb9ffd5e1cfa0e.gif"
          alt=""
        ></Logo>
        <Button onClick={handleSignIn} variant="outlined">
          Login with Google
        </Button>
      </LoginContainer>
    </Container>
  );
};

export default Login;

const Container = styled.div`
  background-color: whitesmoke;
  display: grid;
  place-items: center;
  height: 100vh;
`;

const LoginContainer = styled.div`
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 14px -3px rgba(0, 0, 0, 0.7);
  border-radius: 15px;
  height: 400px;
`;

const Logo = styled.img`
  width: 300px;
`;
