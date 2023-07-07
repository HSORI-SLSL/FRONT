import React, { useEffect, useState } from "react";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";

function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignup, setIsSignup] = useState(true);
  const [isLoggedin, setIsLoggedin] = useState(false);
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedin(true);
      } else {
        setIsLoggedin(false);
      }
    });
    return unsubscribe;
  }, []);

  const toggleSignup = () => {
    setIsSignup((prevIsSignup) => !prevIsSignup);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (isSignup) {
      Signup();
    } else {
      signin();
    }
  };

  const Signup = async () => {
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      console.log("Signup success:", result.user);
    } catch (error) {
      console.error("Signup error:", error);
    }
  };

  const signin = async () => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      console.log("Signin success:", result.user);
    } catch (error) {
      console.error("Signin error:", error);
    }
  };

  return (
    <div>
      <h1>로그인 페이지</h1>
      {isLoggedin ? "로그인됨" : "로그인 안 됨"}
      <button onClick={toggleSignup}>회원가입 / 로그인 변경</button>
      <form onSubmit={onSubmit}>
        <input type="text" name="email" onChange={(e) => setEmail(e.target.value)} />
        <input type="password" name="password" onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">{isSignup ? "회원가입" : "로그인"}</button>
      </form>
    </div>
  );
}

export default Auth;
