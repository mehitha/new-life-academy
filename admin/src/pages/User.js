import React, { useState, useEffect } from "react";
import { FaUser, FaUserShield, FaUserTie, FaEdit, FaTrash } from "react-icons/fa";

const roleIcon = {
  user: <FaUser color="#555" />,
  admin: <FaUserShield color="#0d6efd" />,
  superadmin: <FaUserTie color="#dc3545" />,
};

const User = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    name: "",
    role: "user",
    email: "",
    phone: "",
    password: "",
  });

  const [editingId, setEditingId] = useState(null);

  const [loggedUser, setLoggedUser] = useState(() => {
    const stored = localStorage.getItem("loggedUser");
    return stored ? JSON.parse(stored) : null;
  });

  // Load users on mount
  useEffect(() => {
    loadUsers();
  }, []);

  // Save logged user
  useEffect(() => {
    if (loggedUser) {
      localStorage.setItem("loggedUser", JSON.stringify(loggedUser));
      localStorage.setItem("adminLoggedIn", "true");
    }
  }, [loggedUser]);

  // ✅ Load from API
  const loadUsers = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:3001/api/users');
      if (response.ok) {
        const data = await response.json();
        setUsers(data);
        console.log("✅ Users loaded:", data.length);
      }
    } catch (error) {
      console.error("❌ Error:", error);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Save to API (Direct save to JSON)
  const saveUsers = async (userData) => {
    try {
      const response = await fetch('http://localhost:3001/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });
      if (response.ok) {
        console.log("✅ Users saved to public/users.json");
        return true;
      }
      return false;
    } catch (error) {
      console.error("❌ Error:", error);
      return false;
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Submit - Create or Update user
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.phone || !formData.password) {
      alert("Please fill all fields");
      return;
    }

    // Check duplicate email
    const emailExists = users.some(
      (user) => user.email === formData.email && user.id !== editingId
    );

    if (emailExists) {
      alert("This email is already used!");
      return;
    }

    let updatedUsers;
    
    if (editingId) {
      updatedUsers = users.map((user) =>
        user.id === editingId ? { ...user, ...formData } : user
      );
    } else {
      const newUser = {
        id: users.length ? users[users.length - 1].id + 1 : 1,
        ...formData,
      };
      updatedUsers = [...users, newUser];
    }

    // ✅ Save to JSON file
    const saved = await saveUsers(updatedUsers);
    
    if (saved) {
      // ✅ Reload users after save
      await loadUsers();
      
      setEditingId(null);
      alert(`✅ User "${formData.name}" ${editingId ? "updated" : "created"} successfully!`);
      
      setFormData({
        name: "",
        role: "user",
        email: "",
        phone: "",
        password: "",
      });
    }
  };

  // Edit
  const handleEdit = (user) => {
    setFormData({
      name: user.name,
      role: user.role,
      email: user.email,
      phone: user.phone,
      password: user.password || "",
    });
    setEditingId(user.id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // ✅ Delete
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        const response = await fetch(`http://localhost:3001/api/users/${id}`, {
          method: 'DELETE',
        });
        
        if (response.ok) {
          // ✅ Reload users after delete
          await loadUsers();
          
          const deletedUser = users.find((u) => u.id === id);
          if (loggedUser && deletedUser?.email === loggedUser.email) {
            localStorage.removeItem("loggedUser");
            localStorage.removeItem("adminLoggedIn");
            setLoggedUser(null);
            window.location.href = "/login";
          }
          
          alert("✅ User deleted successfully!");
        }
      } catch (error) {
        console.error("Error:", error);
        alert("❌ Error deleting user!");
      }
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setFormData({
      name: "",
      role: "user",
      email: "",
      phone: "",
      password: "",
    });
  };

  if (loading) {
    return <div style={{ textAlign: "center", padding: "50px" }}>Loading...</div>;
  }

  return (
    <div className="user-container" style={{ maxWidth: "800px", margin: "0 auto", padding: "20px" }}>
      
      <div style={{ 
        display: "flex", 
        justifyContent: "space-between", 
        alignItems: "center", 
        marginBottom: "20px",
        flexWrap: "wrap",
        gap: "10px"
      }}>
        <h2> User Management</h2>
        {/* <button 
          onClick={loadUsers}
          style={{
            padding: "8px 16px",
            background: "#17a2b8",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            fontSize: "14px"
          }}
        >
          🔄 Reload Users
        </button> */}
      </div>

      <h2>{editingId ? "Edit User" : " Create User"}</h2>

      <form onSubmit={handleSubmit} style={{ 
        display: "grid", 
        gridTemplateColumns: "1fr 1fr", 
        gap: "15px",
        background: "#f8f9fa",
        padding: "20px",
        borderRadius: "8px",
        marginBottom: "30px"
      }}>
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          style={{ padding: "10px", border: "1px solid #ddd", borderRadius: "4px" }}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          style={{ padding: "10px", border: "1px solid #ddd", borderRadius: "4px" }}
          required
        />

        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
          style={{ padding: "10px", border: "1px solid #ddd", borderRadius: "4px" }}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          style={{ padding: "10px", border: "1px solid #ddd", borderRadius: "4px" }}
          required
        />

        <select name="role" value={formData.role} onChange={handleChange} style={{ padding: "10px", border: "1px solid #ddd", borderRadius: "4px" }}>
          <option value="user">User</option>
          <option value="admin">Admin</option>
          <option value="superadmin">Superadmin</option>
        </select>

        <button type="submit" style={{ padding: "12px", background: "#007bff", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}>
          {editingId ? "Update User" : "Create User"}
        </button>
        
        {editingId && (
          <button 
            type="button" 
            onClick={handleCancel}
            style={{
              padding: "10px 20px",
              background: "#6c757d",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: "14px"
            }}
          >
            Cancel
          </button>
        )}
      </form>

      <h2>Users List ({users.length})</h2>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "20px" }}>
        {users.length > 0 ? (
          users.map((user) => (
            <div key={user.id} style={{ background: "white", border: "1px solid #e9ecef", borderRadius: "8px", padding: "20px", textAlign: "center" }}>
              <div style={{ fontSize: "40px", marginBottom: "10px" }}>{roleIcon[user.role]}</div>

              <div>
                <p style={{ fontSize: "18px", fontWeight: "bold", margin: "5px 0" }}>{user.name}</p>
                <p style={{ color: "#007bff", fontWeight: "bold", margin: "5px 0" }}>{user.role.toUpperCase()}</p>
                <p style={{ color: "#6c757d", margin: "3px 0", fontSize: "14px" }}>📧 {user.email}</p>
                <p style={{ color: "#6c757d", margin: "3px 0", fontSize: "14px" }}>📱 {user.phone}</p>
              </div>

              <div style={{ display: "flex", gap: "10px", marginTop: "12px", justifyContent: "center" }}>
                <button onClick={() => handleEdit(user)} style={{ padding: "6px 14px", background: "#007bff", color: "white", border: "none", borderRadius: "4px", cursor: "pointer", display: "flex", alignItems: "center", gap: "4px" }}>
                  <FaEdit /> Edit
                </button>

                <button onClick={() => handleDelete(user.id)} style={{ padding: "6px 14px", background: "#dc3545", color: "white", border: "none", borderRadius: "4px", cursor: "pointer", display: "flex", alignItems: "center", gap: "4px" }}>
                  <FaTrash /> Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p style={{ textAlign: "center", color: "#888", marginTop: "20px" }}>
            No users to display. Create a user above!
          </p>
        )}
      </div>
    </div>
  );
};

export default User;