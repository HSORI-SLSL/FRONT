import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const auth = getAuth();
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      console.log("Signup success:", result.user);
      alert("회원가입에 성공했습니다."); // Display success message in an alert
      navigate("/login"); // Redirect to the login page
    } catch (error) {
      console.error("Signup error:", error);
    }
  };

  return (
    <div>
      <h1>회원가입 페이지</h1>
      <form onSubmit={onSubmit}>
        <input type="text" name="email" onChange={(e) => setEmail(e.target.value)} />
        <input type="password" name="password" onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">회원가입</button>
      </form>
      <p>
        이미 회원이신가요?{" "}
        <Link to="/login">로그인 페이지로 이동</Link>
      </p>
    </div>
  );
}

export default Signup;
