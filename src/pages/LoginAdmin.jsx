import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import logosekolah from "../assets/logo562.png";
import "../CSS/Homepage.css"; // Mengimpor CSS dari HomePage

const LoginAdmin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = event => {
    event.preventDefault();

    if (username === "admin" && password === "12345678") {
      window.location.href = "/Tambah";
    } else {
      setMessage("Username atau password salah");
    }
  };

  return (
    <div className="Homebage">
      <div className="box1">
        <br />
        <img className="logosekolahkarangjengkol" src={logosekolah} alt="" />
        <br />
        SELAMAT DATANG <br />
        <span className="span1">Bapak & Ibu guru</span>
        <Form onSubmit={handleLogin}>
          <Form.Group className="mb-3" controlId="formUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Masukan Username"
              value={username}
              onChange={e => setUsername(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
            <br />
            <Form.Text className="text-muted">
              Tolong gunakan username dan password admin yang sudah diberikan
              kepada Bapak/Ibu Guru
            </Form.Text>
          </Form.Group>

          <Button variant="primary" type="submit">
            Masuk
          </Button>
        </Form>
        <p>{message}</p>
      </div>
    </div>
  );
};

export default LoginAdmin;
