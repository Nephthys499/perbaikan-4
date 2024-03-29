import React, { useState } from "react";
import "../CSS/Homepage.css";
import logosekolah from "../assets/logo562.png";
import { Button, Form } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const HomePage = () => {
  const [loginData, setLoginData] = useState(null);

  const submitData = async (event) => {
    event.preventDefault(); // Mencegah pengiriman formulir secara default

    try {
      const username = event.target.formUsername.value;
      const password = event.target.formPassword.value;

      const response = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.message === "OK") {
          // Login berhasil, sesuaikan tindakan Anda di sini
          setLoginData(data.body);
          console.log("Login berhasil");
          window.location.href = "/kelas";
        } else {
          // Login gagal, sesuaikan tindakan Anda di sini
          toast.error("Kata sandi yang kamu masukkan salah, coba lagi yah :)");
          console.log("Login gagal: ", data.message);
        }
      } else {
        const errorData = await response.json();
        console.error("Error:", errorData);
      }
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };

  return (
    <div className="Homebage">
      <div className="box1">
        <br />
        <img className="logosekolahkarangjengkol" src={logosekolah} alt="" />
        <br />
        SELAMAT DATANG DI <br />
        <span className="span1">MI Ya BAKII KARANGJENGKOL</span>
        {/* Login Form */}
        <Form onSubmit={submitData}>
          <Form.Group className="mb-3" controlId="formUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control type="text" placeholder="Masukan Username" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
            <br />
            <Form.Text className="text-muted">Isi dengan teliti ya adik adik! jika ada kesalahan tanyakan pada Bapak/Ibu Guru</Form.Text>
          </Form.Group>

          <Button variant="primary" type="submit">
            Masuk
          </Button>
        </Form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default HomePage;
