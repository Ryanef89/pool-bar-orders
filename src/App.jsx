import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";

import Home from "./pages/Customer/Home";
import Cart from "./pages/Customer/Cart";
import QRCodes from "./pages/Admin/QRCodes";
import Dashboard from "./pages/Admin/Dashboard";
import Products from "./pages/Admin/Products";
import Ombrelloni from "./pages/Admin/Ombrelloni";
import Statistiche from "./pages/Admin/Statistiche";
import Settings from "./pages/Admin/Settings";
import Login from "./pages/Admin/Login";

import { listenAuth } from "./services/authService";

function PrivateRoute({ children }) {
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    const unsubscribe = listenAuth(setUser);
    return () => unsubscribe();
  }, []);

  if (user === undefined) return <div>Caricamento...</div>;

  if (!user) return <Navigate to="/admin/login" replace />;

  return children;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route
  path="/admin/qrcodes"
  element={
    <PrivateRoute>
      <QRCodes />
    </PrivateRoute>
  }
/>

        <Route path="/admin/login" element={<Login />} />

        <Route
          path="/admin"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />

        <Route
          path="/admin/products"
          element={
            <PrivateRoute>
              <Products />
            </PrivateRoute>
          }
        />

        <Route
          path="/admin/ombrelloni"
          element={
            <PrivateRoute>
              <Ombrelloni />
            </PrivateRoute>
          }
        />

        <Route
          path="/admin/statistiche"
          element={
            <PrivateRoute>
              <Statistiche />
            </PrivateRoute>
          }
        />

        <Route
          path="/admin/settings"
          element={
            <PrivateRoute>
              <Settings />
            </PrivateRoute>
          }
        />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
  
}