import { Button } from "@chakra-ui/react";
import { signInWithPopup } from "firebase/auth";
import { NextPage } from "next";
import { auth, provider } from "../lib/auth";

const LogIn: NextPage = () => {
  const signInWithGoogle = async () => {
    return await signInWithPopup(auth, provider).then(() =>
      window.location.replace("/")
    );
  };

  return <Button onClick={() => signInWithGoogle()}>Log In</Button>;
};

export default LogIn;
