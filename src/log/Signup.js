import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import Form from "react-bootstrap/Form"; 
import Button from "react-bootstrap/Button";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';




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
    <div className="d-flex flex-column align-items-center" style={{ minHeight: "100vh" }}>
       <h4 className="text-center" style={{ marginTop: "200px"}}>회원가입</h4>
             
      <Container className="panel" style={{ maxWidth: "350px", marginTop: "60px" }}>
        <Form onSubmit={onSubmit}>
          <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
            <Col sm={12}>
            <Form.Control
                type="email"
                placeholder="Email"
                value={email} // 바인딩된 email 상태를 value로 설정
                onChange={(e) => setEmail(e.target.value)} // email 상태 업데이트
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
            <Col sm={12}>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password} // 바인딩된 password 상태를 value로 설정
                onChange={(e) => setPassword(e.target.value)} // password 상태 업데이트
              />
            </Col>
          </Form.Group>
          <br />

          <div className="d-grid gap-1">
            <Button variant="secondary" type="submit">
              회원가입
            </Button>
          </div>
        </Form>
      </Container>
      <p style={{ marginTop: "15px" }}>
        이미 회원이신가요?{" "}
        <Link to="/login">로그인 페이지로 이동</Link>
      </p>
    </div>
  );
}

export default Signup;