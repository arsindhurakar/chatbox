import "../styles/globals.css";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebase";
import Login from "./login";
import Loading from "../components/Loading";
import { useEffect } from "react";
import firebase from "firebase";

function MyApp({ Component, pageProps }) {
  const [user, loading] = useAuthState(auth); // sets user state on user signin or signout

  useEffect(() => {
    if (user) {
      db.collection("users").doc(user.uid).set(
        {
          email: user.email,
          photoURL: user.photoURL,
          displayName: user.displayName,
          lastSeen: firebase.firestore.FieldValue.serverTimestamp(), // grabbing firebases' firestores' database timestamp
        },
        { merge: true } // set replaces everything inside the document but with merge update is possible
      );
    }
  }, [user]);

  if (loading) return <Loading />;
  if (!user) return <Login />;

  return <Component {...pageProps} />;
}

export default MyApp;
