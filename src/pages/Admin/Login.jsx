import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../services/authService";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin(e) {
    e.preventDefault();

    try {
      await login(email, password);
      navigate("/admin");
    } catch {
      alert("Email o password non validi.");
    }
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#f4f6f9",
      }}
    >
      <form
        onSubmit={handleLogin}
        style={{
          width: 350,
          background: "white",
          padding: 30,
          borderRadius: 15,
          boxShadow: "0 10px 25px rgba(0,0,0,.1)",
        }}
      >
        <h1>🔐 Login Admin</h1>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            width: "100%",
            padding: 12,
            marginTop: 20,
            marginBottom: 15,
          }}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            width: "100%",
            padding: 12,
            marginBottom: 20,
          }}
        />

        <button
          style={{
            width: "100%",
            padding: 14,
          }}
        >
          Accedi
        </button>
      </form>
    </div>
  );
}

export default Login;