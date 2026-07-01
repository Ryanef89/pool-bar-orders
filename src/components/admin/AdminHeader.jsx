import { useNavigate, useLocation } from "react-router-dom";
import { logout } from "../../services/authService";

function AdminHeader() {
  const navigate = useNavigate();
  const location = useLocation();

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
        background: "#fff",
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
                  : "#eee",
              color:
                location.pathname === item.path
                  ? "#fff"
                  : "#333",
            }}
          >
            {item.label}
          </button>
        ))}

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