import { Circle } from "better-react-spinkit";

const Loading = ({ minor }) => {
  return (
    <center>
      {!minor ? (
        <>
          <p>Loading..</p>
          <Circle color="#3cbc28" size={60} />
        </>
      ) : (
        <Circle color="#3cbc28" size={30} />
      )}
    </center>
  );
};

export default Loading;
