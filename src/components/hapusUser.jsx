import React, { useState, useEffect } from "react";
import "../CSS/TambahUser.css"; // Import file CSS untuk komponen HapusUser

const HapusUser = () => {
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState("");
  const [selectedUser, setSelectedUser] = useState({
    UserId: "",
    NISN: "",
    FullName: "",
    Password: "",
  });
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Fetch the list of users when the component mounts
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch("http://localhost:3000/user");
      if (response.ok) {
        const data = await response.json();
        setUsers(data.body);
      } else {
        const errorData = await response.json();
        console.error("Error fetching users:", errorData);
        setMessage("Failed to fetch users");
      }
    } catch (error) {
      console.error("Error fetching users:", error);
      setMessage("Failed to fetch users");
    }
  };

  const handleUserSelection = userId => {
    const selectedUser = users.find(user => user.UserId === parseInt(userId));
    setSelectedUserId(userId);
    setSelectedUser(
      selectedUser || { UserId: "", NISN: "", FullName: "", Password: "" }
    );
  };

  const handleDeleteUser = async () => {
    try {
      const response = await fetch("http://localhost:3000/user/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          mode: "DELETE",
          UserId: selectedUser.UserId,
          NISN: selectedUser.NISN,
          FullName: selectedUser.FullName,
          Password: selectedUser.Password,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setMessage("User deleted successfully");
        // Refresh the user list after deletion
        fetchUsers();
        setSelectedUserId(""); // Reset selected user after deletion
        setSelectedUser({
          UserId: "",
          NISN: "",
          FullName: "",
          Password: "",
        });
      } else {
        const errorData = await response.json();
        console.error("Error deleting user:", errorData);
        setMessage(`Failed to delete user: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      setMessage("Error deleting user");
    }
  };

  return (
    <div className="hapus-user-container">
      {" "}
      {/* Menggunakan className untuk menamai div */}
      <h2>Delete User</h2>
      <label>
        Select User to Delete:
        <select
          value={selectedUserId}
          onChange={e => handleUserSelection(e.target.value)}
        >
          <option value="">Select a user</option>
          {users.map(user => (
            <option key={user.UserId} value={user.UserId}>
              {user.FullName}
            </option>
          ))}
        </select>
      </label>
      {selectedUserId && (
        <div>
          <p>Selected User Information:</p>
          <p>User ID: {selectedUser.UserId}</p>
          <p>NISN: {selectedUser.NISN}</p>
          <p>Full Name: {selectedUser.FullName}</p>
          <p>Password: {selectedUser.Password}</p>
        </div>
      )}
      <button onClick={handleDeleteUser} disabled={!selectedUserId}>
        Delete User
      </button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default HapusUser;
