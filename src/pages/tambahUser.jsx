import React, { useState } from "react";
import Hapus from "../components/hapusUser.jsx";

import "../CSS/TambahUser.css";

const TambahUser = () => {
  const [newUser, setNewUser] = useState({
    NISN: "",
    FullName: "",
    Password: "",
    IsAdmin: false, // Tambahkan state untuk isAdmin dengan nilai awal false
  });

  const [message, setMessage] = useState("");

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      console.log("Submitting data:", newUser);

      const response = await fetch("http://localhost:3000/user/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          mode: "CREATE",
          NISN: newUser.NISN,
          FullName: newUser.FullName,
          Password: newUser.Password,
          IsAdmin: newUser.IsAdmin, // Sertakan nilai isAdmin dalam data yang dikirim
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Response data:", data);
        setMessage("User created successfully");
      } else {
        const errorData = await response.json();
        console.error("Error creating user:", errorData);
        setMessage(`Failed to create user: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Error creating user:", error);
      setMessage("Error creating user");
    }
  };

  return (
    <div className="tambahUser">
      <div className="tambah-user-container">
        <h2>Add User</h2>
        <form onSubmit={handleSubmit} className="user-form">
          <label className="form-label">
            NISN
            <input
              type="text"
              value={newUser.NISN}
              onChange={e => setNewUser({ ...newUser, NISN: e.target.value })}
            />
          </label>

          <label className="form-label">
            Full Name
            <input
              type="text"
              value={newUser.FullName}
              onChange={e =>
                setNewUser({ ...newUser, FullName: e.target.value })
              }
            />
          </label>

          <label className="form-label">
            Password
            <input
              type="password"
              value={newUser.Password}
              onChange={e =>
                setNewUser({ ...newUser, Password: e.target.value })
              }
            />
          </label>

          <label className="form-label">
            Guru :{" "}
            {/* Tambahkan opsi ceklis untuk menentukan apakah pengguna adalah admin */}
            <input
              type="checkbox"
              checked={newUser.IsAdmin}
              onChange={e =>
                setNewUser({ ...newUser, IsAdmin: e.target.checked })
              }
            />
          </label>

          <button type="submit" className="submit-button">
            Add User
          </button>
        </form>

        {message && <p className="error-message">{message}</p>}
      </div>
      <br />
      <br />
      <br />
      <Hapus />
    </div>
  );
};

export default TambahUser;
