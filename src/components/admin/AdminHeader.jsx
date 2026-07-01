import { useNavigate, useLocation } from "react-router-dom";
import { logout } from "../../services/authService";
import { useTheme } from "../../context/ThemeContext";

function AdminHeader() {
  const navigate = useNavigate();
  const location = useLocation();

  const { dark, toggleTheme } = useTheme();

  const menu = [
    { label: "🏠 Dashboard", path: "/admin" },
    { label: "📦 Prodotti", path: "/admin/products" },
    { label: "🏖 Ombrelloni", path: "/admin/ombrelloni" },
    { label: "📱 QR Code", path: "/admin/qrcodes" },
    { label: "📊 Statistiche", path: "/admin/statistiche" },
    { label: "⚙️ Impostazioni", path: "/admin/settings" },
  ];

  async function handleLogout() {
    await logout();
    navigate("/admin/login");
  }

  async function toggleFullscreen() {
    if (!document.fullscreenElement) {
      await document.documentElement.requestFullscreen();
    } else {
      await document.exitFullscreen();
    }
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        gap: 10,
        marginBottom: 30,
        padding: 20,
        background: dark ? "#1f2937" : "#fff",
        color: dark ? "#fff" : "#000",
        borderRadius: 15,
        boxShadow: "0 5px 15px rgba(0,0,0,.08)",
      }}
    >
      <h2 style={{ margin: 0 }}>
        🍹 Pool Bar Admin
      </h2>

      <div
        style={{
          display: "flex",
          gap: 10,
          flexWrap: "wrap",
        }}
      >
        {menu.map((item) => (
          <button
            key={item.path}
            onClick={() => navigate(item.path)}
            style={{
              padding: "10px 16px",
              border: "none",
              borderRadius: 8,
              cursor: "pointer",
              background:
                location.pathname === item.path
                  ? "#0b8457"
                  : dark
                  ? "#374151"
                  : "#eee",
              color:
                location.pathname === item.path
                  ? "#fff"
                  : dark
                  ? "#fff"
                  : "#333",
            }}
          >
            {item.label}
          </button>
        ))}

        <button
          onClick={toggleTheme}
          style={{
            padding: "10px 16px",
            border: "none",
            borderRadius: 8,
            cursor: "pointer",
            background: "#6f42c1",
            color: "#fff",
          }}
        >
          {dark ? "🌞 Chiaro" : "🌙 Scuro"}
        </button>

        <button
          onClick={toggleFullscreen}
          style={{
            padding: "10px 16px",
            border: "none",
            borderRadius: 8,
            cursor: "pointer",
            background: "#0d6efd",
            color: "#fff",
          }}
        >
          ⛶ Full Screen
        </button>

        <button
          onClick={handleLogout}
          style={{
            padding: "10px 16px",
            border: "none",
            borderRadius: 8,
            cursor: "pointer",
            background: "#dc3545",
            color: "#fff",
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default AdminHeader;