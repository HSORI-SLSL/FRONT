import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import Form from "react-bootstrap/Form"; 
import Button from "react-bootstrap/Button";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const auth = getAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    if (e.target.name === "email") {
      setEmail(e.target.value);
    } else if (e.target.name === "password") {
      setPassword(e.target.value);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      console.log("Signin success:", result.user);
      alert("로그인에 성공했습니다.");
      navigate("/");
    } catch (error) {
      console.error("login error:", error);
    }
  };

  return (
    <div className="d-flex flex-column align-items-center" style={{ minHeight: "100vh" }}>
      <Container className="panel" style={{ maxWidth: "350px", marginTop: "250px" }}>
        <Form onSubmit={onSubmit}>
          <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
            <Col sm={12}>
              <Form.Control
                type="email"
                name="email"
                placeholder="Email"
                value={email}
                onChange={handleChange}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
            <Col sm={12}>
              <Form.Control
                type="password"
                name="password"
                placeholder="Password"
                value={password}
                onChange={handleChange}
              />
            </Col>
          </Form.Group>
          <br />

          <div className="d-grid gap-1">
            <Button variant="secondary" type="submit">
              로그인
            </Button>
          </div>
        </Form>

        <p  style={{ marginTop: "15px" }}>
          회원이 아니신가요? <Link to="/signup">회원가입 페이지로 이동</Link>
        </p>
      </Container>
    </div>
  );
}

export default Login;