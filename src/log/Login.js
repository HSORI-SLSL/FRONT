import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const auth = getAuth();
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      console.log("Signin success:", result.user);
      alert("로그인에 성공했습니다.");
      navigate("/");

    } catch (error) {
      console.error("Signin error:", error);
    }
  };

  return (
    <div>
      <h1>로그인 페이지</h1>
      <form onSubmit={onSubmit}>
        <input type="text" name="email" onChange={(e) => setEmail(e.target.value)} />
        <input type="password" name="password" onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">로그인</button>
      </form>
      <p>
        회원이 아니신가요?{" "}
        <Link to="/signup">회원가입 페이지로 이동</Link>
      </p>
    </div>
  );
}

export default Login;
