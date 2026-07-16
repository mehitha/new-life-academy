// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// function Login() {
//   const navigate = useNavigate();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // ✅ Load users from public/users.json
//   useEffect(() => {
//     loadUsers();
//   }, []);

//   // Check if already logged in
//   useEffect(() => {
//     const isLoggedIn = localStorage.getItem("adminLoggedIn");
//     if (isLoggedIn === "true") {
//       navigate("/admin/home");
//     }
//   }, [navigate]);

//   // ✅ Load users from public/users.json
//   const loadUsers = async () => {
//     try {
//       const response = await fetch("/users.json");
//       if (response.ok) {
//         const data = await response.json();
//         setUsers(data);
//         // Save to localStorage as backup
//         localStorage.setItem("users_backup", JSON.stringify(data));
//         console.log("✅ Users loaded from public/users.json:", data);
//       } else {
//         console.error("❌ Error loading users.json");
//         // Try localStorage backup
//         const backup = localStorage.getItem("users_backup");
//         if (backup) {
//           setUsers(JSON.parse(backup));
//         } else {
//           // Default users
//           const defaultUsers = [
//             {
//               id: 1,
//               name: "John Doe",
//               role: "admin",
//               email: "admin@gmail.com",
//               phone: "9876543210",
//               password: "1234",
//             },
//           ];
//           setUsers(defaultUsers);
//         }
//       }
//     } catch (error) {
//       console.error("❌ Error loading users:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleLogin = (e) => {
//     e.preventDefault();

//     if (!email || !password) {
//       alert("Please enter email and password!");
//       return;
//     }

//     // ✅ Check in loaded users
//     const foundUser = users.find(
//       (user) => user.email === email && user.password === password
//     );

//     if (foundUser) {
//       localStorage.setItem("adminLoggedIn", "true");
//       localStorage.setItem("loggedUser", JSON.stringify(foundUser));
//       alert("✅ Login Successfully!");
//       navigate("/admin/home");
//     } else {
//       alert("❌ Invalid Credentials! Email or Password is wrong.");
//     }
//   };

//   if (loading) {
//     return <div style={styles.container}>Loading...</div>;
//   }

//   return (
//     <div style={styles.container}>
//       <div style={styles.card}>
//         <h2 style={styles.title}>Sign in to your account</h2>

//         {/* <p style={styles.subtitle}>
//           Don't have an account? <span style={styles.link}>Get started</span>
//         </p> */}

//         <div style={styles.infoBox}>
//           <span style={styles.infoIcon}>i</span>
//           <span>
//           NEW LIFE ACADEMY ADMIN LOGIN
//           </span>
//         </div>

//         <form onSubmit={handleLogin}>
//           <div style={styles.inputGroup}>
//             <label>Email address</label>
//             <input
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               style={styles.input}
//               placeholder="Enter your email"
//               required
//             />
//           </div>

//           <div style={styles.inputGroup}>
//             <div style={styles.passwordHeader}>
//               <label>Password</label>
//               <span style={styles.forgot}>Forgot password?</span>
//             </div>
//             <input
//               type="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               style={styles.input}
//               placeholder="Enter your password"
//               required
//             />
//           </div>

//           <button type="submit" style={styles.button}>
//             Sign in
//           </button>
//         </form>

//         <div style={{ marginTop: "15px", textAlign: "center", fontSize: "12px", color: "#888" }}>
//           {/* <p>Total Users: {users.length}</p> */}
//         </div>
//       </div>
//     </div>
//   );
// }

// const styles = {
//   container: {
//     height: "100vh",
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//     background: "#f5f5f5",
//   },
//   card: {
//     width: "400px",
//     background: "#fff",
//     padding: "30px",
//     borderRadius: "12px",
//     boxShadow: "0 5px 20px rgba(0,0,0,0.1)",
//   },
//   title: {
//     marginBottom: "10px",
//     fontWeight: "600",
//   },
//   subtitle: {
//     color: "#777",
//     marginBottom: "20px",
//     fontSize: "14px",
//   },
//   link: {
//     color: "#00b894",
//     cursor: "pointer",
//     fontWeight: "bold",
//   },
//   infoBox: {
//     background: "#dff6f2",
//     padding: "12px",
//     borderRadius: "8px",
//     display: "flex",
//     alignItems: "center",
//     gap: "10px",
//     marginBottom: "20px",
//     fontSize: "14px",
//   },
//   infoIcon: {
//     background: "#00b894",
//     color: "#fff",
//     borderRadius: "50%",
//     width: "22px",
//     height: "22px",
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//     fontSize: "12px",
//   },
//   inputGroup: {
//     marginBottom: "15px",
//     display: "flex",
//     flexDirection: "column",
//   },
//   input: {
//     padding: "12px",
//     borderRadius: "8px",
//     border: "1px solid #ccc",
//     marginTop: "5px",
//     fontSize: "14px",
//     outline: "none",
//   },
//   passwordHeader: {
//     display: "flex",
//     justifyContent: "space-between",
//     alignItems: "center",
//   },
//   forgot: {
//     fontSize: "12px",
//     color: "#888",
//     cursor: "pointer",
//   },
//   button: {
//     width: "100%",
//     padding: "12px",
//     background: "#1f2d3d",
//     color: "#fff",
//     border: "none",
//     borderRadius: "8px",
//     marginTop: "10px",
//     cursor: "pointer",
//     fontSize: "16px",
//   },
// };

// export default Login;












import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Responsive CSS ஐ inject செய்யும் Effect
  useEffect(() => {
    const styleTag = document.createElement("style");
    styleTag.innerHTML = `
      /* ---------- Responsive Overrides ---------- */
      
      /* Mini iPad & Tablets (Portrait) */
      @media screen and (max-width: 820px) {
        .login-card-responsive {
          width: 80% !important;
          max-width: 500px !important;
          padding: 25px !important;
        }
        .login-title-responsive {
          font-size: 1.4rem !important;
        }
        .login-info-responsive {
          font-size: 13px !important;
          padding: 10px !important;
        }
        .login-input-responsive {
          padding: 10px !important;
          font-size: 14px !important;
        }
        .login-btn-responsive {
          padding: 12px !important;
          font-size: 15px !important;
        }
      }

      /* Mobile Devices (Large Phones) */
      @media screen and (max-width: 600px) {
        .login-card-responsive {
          width: 95% !important;
          max-width: 100% !important;
          padding: 20px !important;
        }
        .login-title-responsive {
          font-size: 1.2rem !important;
        }
        .login-info-responsive {
          font-size: 12px !important;
          padding: 8px !important;
          flex-wrap: wrap !important;
        }
        .login-input-responsive {
          padding: 12px !important; /* Touch friendly */
          font-size: 15px !important;
        }
        .login-btn-responsive {
          padding: 14px !important;
          font-size: 16px !important;
        }
        .login-forgot-responsive {
          font-size: 11px !important;
        }
      }

      /* Very Small Phones (<= 400px) */
      @media screen and (max-width: 400px) {
        .login-card-responsive {
          padding: 15px !important;
        }
        .login-title-responsive {
          font-size: 1.1rem !important;
        }
        .login-info-responsive {
          font-size: 11px !important;
          gap: 6px !important;
        }
        .login-input-responsive {
          padding: 10px !important;
          font-size: 14px !important;
        }
        .login-btn-responsive {
          padding: 12px !important;
          font-size: 15px !important;
        }
      }
    `;
    document.head.appendChild(styleTag);

    // Cleanup
    return () => {
      document.head.removeChild(styleTag);
    };
  }, []);

  // ✅ Load users from public/users.json
  useEffect(() => {
    loadUsers();
  }, []);

  // Check if already logged in
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("adminLoggedIn");
    if (isLoggedIn === "true") {
      navigate("/admin/home");
    }
  }, [navigate]);

  // ✅ Load users from public/users.json
  const loadUsers = async () => {
    try {
      const response = await fetch("/users.json");
      if (response.ok) {
        const data = await response.json();
        setUsers(data);
        // Save to localStorage as backup
        localStorage.setItem("users_backup", JSON.stringify(data));
        console.log("✅ Users loaded from public/users.json:", data);
      } else {
        console.error("❌ Error loading users.json");
        // Try localStorage backup
        const backup = localStorage.getItem("users_backup");
        if (backup) {
          setUsers(JSON.parse(backup));
        } else {
          // Default users
          const defaultUsers = [
            {
              id: 1,
              name: "John Doe",
              role: "admin",
              email: "admin@gmail.com",
              phone: "9876543210",
              password: "1234",
            },
          ];
          setUsers(defaultUsers);
        }
      }
    } catch (error) {
      console.error("❌ Error loading users:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please enter email and password!");
      return;
    }

    // ✅ Check in loaded users
    const foundUser = users.find(
      (user) => user.email === email && user.password === password
    );

    if (foundUser) {
      localStorage.setItem("adminLoggedIn", "true");
      localStorage.setItem("loggedUser", JSON.stringify(foundUser));
      alert("✅ Login Successfully!");
      navigate("/admin/home");
    } else {
      alert("❌ Invalid Credentials! Email or Password is wrong.");
    }
  };

  if (loading) {
    return <div style={styles.container}>Loading...</div>;
  }

  return (
    <div style={styles.container}>
      {/* className added for responsive override */}
      <div style={styles.card} className="login-card-responsive">
        <h2 style={styles.title} className="login-title-responsive">
          Sign in to your account
        </h2>

        <div style={styles.infoBox} className="login-info-responsive">
          <span style={styles.infoIcon}>i</span>
          <span>NEW LIFE ACADEMY ADMIN LOGIN</span>
        </div>

        <form onSubmit={handleLogin}>
          <div style={styles.inputGroup}>
            <label>Email address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={styles.input}
              className="login-input-responsive"
              placeholder="Enter your email"
              required
            />
          </div>

          <div style={styles.inputGroup}>
            <div style={styles.passwordHeader}>
              <label>Password</label>
              <span style={styles.forgot} className="login-forgot-responsive">
                Forgot password?
              </span>
            </div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input}
              className="login-input-responsive"
              placeholder="Enter your password"
              required
            />
          </div>

          <button type="submit" style={styles.button} className="login-btn-responsive">
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
}

// ✅ Inline Styles (Base - Desktop First)
const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#f5f5f5",
    padding: "20px", // Added for small screens safety
  },
  card: {
    width: "400px", // Base width for desktop
    background: "#fff",
    padding: "30px",
    borderRadius: "12px",
    boxShadow: "0 5px 20px rgba(0,0,0,0.1)",
    boxSizing: "border-box", // Important for responsive padding
  },
  title: {
    marginBottom: "10px",
    fontWeight: "600",
  },
  subtitle: {
    color: "#777",
    marginBottom: "20px",
    fontSize: "14px",
  },
  link: {
    color: "#00b894",
    cursor: "pointer",
    fontWeight: "bold",
  },
  infoBox: {
    background: "#dff6f2",
    padding: "12px",
    borderRadius: "8px",
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginBottom: "20px",
    fontSize: "14px",
  },
  infoIcon: {
    background: "#00b894",
    color: "#fff",
    borderRadius: "50%",
    width: "22px",
    height: "22px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "12px",
    flexShrink: 0, // Prevents icon from shrinking
  },
  inputGroup: {
    marginBottom: "15px",
    display: "flex",
    flexDirection: "column",
  },
  input: {
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    marginTop: "5px",
    fontSize: "14px",
    outline: "none",
    width: "100%",
    boxSizing: "border-box",
  },
  passwordHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  forgot: {
    fontSize: "12px",
    color: "#888",
    cursor: "pointer",
  },
  button: {
    width: "100%",
    padding: "12px",
    background: "#1f2d3d",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    marginTop: "10px",
    cursor: "pointer",
    fontSize: "16px",
  },
};

export default Login;