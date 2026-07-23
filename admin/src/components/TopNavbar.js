import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  FaHome,
  FaUsers,
  FaImages,
  FaCommentDots,
  FaBars,
  FaTimes,
} from "react-icons/fa";

function TopNavbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [showPanel, setShowPanel] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("adminLoggedIn");
    navigate("/login");
    closeAllMenus();
  };

  const closeAllMenus = () => {
    setShowPanel(false);
    setShowMobileMenu(false);
  };

  const menuItems = [
    { name: "Home", path: "/admin/home", icon: <FaHome /> },
    { name: "User", path: "/admin/user", icon: <FaUsers /> },
    { name: "Gallery", path: "/admin/gallery", icon: <FaImages /> },
    { name: "Feedback", path: "/admin/feedback", icon: <FaCommentDots /> },
  ];

  return (
    <>
      {/* 🔝 TOP NAVBAR */}
      <div style={styles.topBar}>
        <div style={styles.leftSection}>
          {isMobile ? (
            // ✅ MOBILE: Hamburger + Logo side by side
            <div style={styles.mobileLeftSection}>
              <div style={styles.hamburger} onClick={() => setShowMobileMenu(true)}>
                <FaBars size={22} />
              </div>
              <div style={styles.mobileLogo}>
                <img src="/new1.ico" alt="logo" style={styles.logoImgMobile} />
              </div>
            </div>
          ) : (
            // DESKTOP: Only logo
            <div style={styles.logo}>
              <img src="/new1.ico" alt="logo" style={styles.logoImg} />
            </div>
          )}
        </div>

        <div style={styles.rightSection}>
          <div
            style={styles.profile}
            onClick={() => setShowPanel(true)}
          >
            <img
              src="https://api.dicebear.com/7.x/shapes/png?seed=globe&backgroundColor=0ea5e9"
              alt="profile"
              style={styles.avatar}
            />
          </div>
        </div>
      </div>

      {/* 🔽 DESKTOP MENU BAR */}
      {!isMobile && (
        <div style={styles.menuBar}>
          <div style={styles.menuContainer}>
            {menuItems.map((item, index) => {
              const isActive = location.pathname === item.path;
              return (
                <div
                  key={index}
                  onClick={() => navigate(item.path)}
                  style={{
                    ...styles.menuItem,
                    ...(isActive ? styles.activeItem : {}),
                  }}
                >
                  <span style={styles.icon}>{item.icon}</span>
                  <span>{item.name}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 🔥 MOBILE SIDEBAR MENU */}
      {isMobile && showMobileMenu && (
        <div style={styles.mobileOverlay} onClick={closeAllMenus}>
          <div 
            style={styles.mobileMenu} 
            onClick={(e) => e.stopPropagation()}
          >
            <div style={styles.mobileHeader}>
              <div style={styles.logoMobile}>
                <img src="/logo.png" alt="logo" style={styles.logoImgMobile} />
              </div>
              <FaTimes 
                style={styles.closeIcon} 
                onClick={closeAllMenus} 
                size={24}
              />
            </div>

            <div style={styles.mobileMenuItems}>
              {menuItems.map((item, index) => {
                const isActive = location.pathname === item.path;
                return (
                  <div
                    key={index}
                    onClick={() => {
                      navigate(item.path);
                      closeAllMenus();
                    }}
                    style={{
                      ...styles.mobileMenuItem,
                      ...(isActive ? styles.activeMobileItem : {}),
                    }}
                  >
                    <span style={styles.mobileIcon}>{item.icon}</span>
                    <span style={styles.mobileItemText}>{item.name}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* 🔥 PROFILE PANEL */}
      {showPanel && (
        <div style={styles.overlay} onClick={closeAllMenus}>
          <div style={styles.panel} onClick={(e) => e.stopPropagation()}>
            <span style={styles.close} onClick={closeAllMenus}>✕</span>
            
            <div style={styles.top}>
              <img
                src="https://api.dicebear.com/7.x/personas/png?seed=admin"
                alt="avatar"
                style={styles.mainAvatar}
              />
              <h2 style={styles.name}>Hello Admin!</h2>
              {/* <p style={styles.email}>demo@minimals.cc</p> */}
              
              {/* <div style={styles.avatarRow}>
                <img src="https://api.dicebear.com/7.x/personas/png?seed=1" style={styles.smallAvatar}/>
                <img src="https://api.dicebear.com/7.x/personas/png?seed=2" style={styles.smallAvatar}/>
                <img src="https://api.dicebear.com/7.x/personas/png?seed=3" style={styles.smallAvatar}/>
                <div style={styles.addAvatar}>+</div>
              </div> */}
            </div>

            <div style={styles.menu}>
              <p onClick={() => {navigate("/admin/home"); closeAllMenus();}}>🏠 Home</p>
              <p>👤 Profile</p>
              <p>⚙️ Account Settings</p>
            </div>

            <button style={styles.logout} onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default TopNavbar;

/* 🔥 UPDATED STYLES */
const styles = {
  topBar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "12px 20px",
    background: "#f8f9fa",
    borderBottom: "1px solid #ddd",
    position: "sticky",
    top: 0,
    zIndex: 1000,
  },

  leftSection: {
    display: "flex",
    alignItems: "center",
  },

  // ✅ NEW: Mobile left section with hamburger + logo
  mobileLeftSection: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },

  hamburger: {
    cursor: "pointer",
    padding: "8px",
    borderRadius: "8px",
    color: "#333",
    transition: "all 0.3s",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  mobileLogo: {
    display: "flex",
    alignItems: "center",
  },

  logo: { display: "flex", alignItems: "center" },
  logoImg: { height: "40px" },
  logoImgMobile: { 
    height: "32px",
    maxWidth: "120px", // Prevent overflow
  },

  rightSection: { display: "flex", alignItems: "center" },
  profile: { cursor: "pointer" },
  avatar: {
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    border: "2px solid #00b894",
  },

  /* DESKTOP MENU */
  menuBar: { background: "#fff", borderBottom: "1px solid #eee" },
  menuContainer: {
    display: "flex",
    justifyContent: "center",
    gap: "40px",
    padding: "12px 30px",
    maxWidth: "1200px",
    margin: "0 auto",
  },
  menuItem: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    cursor: "pointer",
    padding: "10px 16px",
    borderRadius: "12px",
    transition: "all 0.3s ease",
    fontWeight: 500,
    color: "#555",
  },
  activeItem: {
    background: "linear-gradient(135deg, #00b894, #00d4aa)",
    color: "white",
    boxShadow: "0 4px 12px rgba(0, 184, 148, 0.3)",
  },
  icon: { fontSize: "18px" },

  /* MOBILE MENU */
  mobileOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "rgba(0,0,0,0.5)",
    zIndex: 999,
  },
  mobileMenu: {
    width: "280px",
    background: "white",
    height: "100%",
    boxShadow: "4px 0 20px rgba(0,0,0,0.1)",
    display: "flex",
    flexDirection: "column",
  },
  mobileHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "20px",
    borderBottom: "1px solid #eee",
  },
  logoMobile: { display: "flex", alignItems: "center" },
  closeIcon: { cursor: "pointer", color: "#666" },
  mobileMenuItems: { flex: 1, padding: "10px 0" },
  mobileMenuItem: {
    display: "flex",
    alignItems: "center",
    gap: "16px",
    padding: "16px 20px",
    cursor: "pointer",
    transition: "all 0.3s ease",
    borderLeft: "3px solid transparent",
  },
  activeMobileItem: {
    background: "#f0f9ff",
    color: "#00b894",
    borderLeftColor: "#00b894",
    fontWeight: 600,
  },
  mobileIcon: { fontSize: "20px", minWidth: "24px" },
  mobileItemText: { fontSize: "16px", fontWeight: 500 },

  /* PROFILE PANEL */
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "rgba(0,0,0,0.4)",
    zIndex: 1001,
    display: "flex",
    justifyContent: "flex-end",
  },
  panel: {
    width: "360px",
    maxWidth: "90vw",
    background: "#fff",
    borderRadius: "20px 0 0 20px",
    padding: "30px",
    boxShadow: "-4px 0 20px rgba(0,0,0,0.1)",
    maxHeight: "90vh",
    overflowY: "auto",
  },
  close: {
    position: "absolute",
    top: "20px",
    right: "20px",
    fontSize: "24px",
    cursor: "pointer",
    color: "#666",
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  top: { textAlign: "center", marginTop: "10px" },
  mainAvatar: {
    width: "80px",
    height: "80px",
    borderRadius: "50%",
    border: "3px solid #00b894",
    margin: "0 auto",
  },
  name: { margin: "15px 0 8px", fontSize: "20px", fontWeight: 600 },
  email: { color: "#666", marginBottom: "20px" },
  avatarRow: {
    display: "flex",
    justifyContent: "center",
    gap: "10px",
    marginTop: "15px",
  },
  smallAvatar: { width: "35px", height: "35px", borderRadius: "50%" },
  addAvatar: {
    width: "35px",
    height: "35px",
    borderRadius: "50%",
    border: "2px dashed #aaa",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    fontSize: "18px",
    color: "#aaa",
  },
  menu: { marginTop: "30px" },
  logout: {
    width: "100%",
    marginTop: "25px",
    padding: "14px",
    border: "none",
    borderRadius: "12px",
    background: "linear-gradient(135deg, #fee2e2, #fecaca)",
    color: "#dc2626",
    fontWeight: "600",
    cursor: "pointer",
    fontSize: "16px",
  },
};