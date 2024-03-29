import React, { useState } from "react";

const TambahUser = () => {
  const [newUser, setNewUser] = useState({
    NIK: "",
    FullName: "",
    Password: "",
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
          NIK: newUser.NIK,
          FullName: newUser.FullName,
          Password: newUser.Password,
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
    <div>
      <h2>Add User</h2>
      <form onSubmit={handleSubmit}>
        <label>
          NIK:
          <input
            type="text"
            value={newUser.NIK}
            onChange={e => setNewUser({ ...newUser, NIK: e.target.value })}
          />
        </label>

        <label>
          Full Name:
          <input
            type="text"
            value={newUser.FullName}
            onChange={e => setNewUser({ ...newUser, FullName: e.target.value })}
          />
        </label>

        <label>
          Password:
          <input
            type="password"
            value={newUser.Password}
            onChange={e => setNewUser({ ...newUser, Password: e.target.value })}
          />
        </label>

        <button type="submit">Add User</button>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
};

export default TambahUser;
