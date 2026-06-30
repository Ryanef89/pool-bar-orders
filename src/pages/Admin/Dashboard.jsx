import { useEffect, useRef, useState } from "react";
import { listenOrders } from "../../services/orderListener";

import DashboardStats from "../../components/admin/DashboardStats";
import OrderColumn from "../../components/OrderColumn";

function Dashboard() {
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState("");

  const previousCount = useRef(0);

  useEffect(() => {
    const unsubscribe = listenOrders(setOrders);

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (
      previousCount.current > 0 &&
      orders.length > previousCount.current
    ) {
      const audio = new Audio("/sounds/new-order.mp3");
      audio.play().catch(() => {});
    }

    previousCount.current = orders.length;
  }, [orders]);

  const filteredOrders = orders.filter((order) =>
    order.ombrellone
      ?.toString()
      .includes(search.trim())
  );

  const nuovi = filteredOrders.filter(
    (order) => order.status === "new"
  );

  const preparazione = filteredOrders.filter(
    (order) => order.status === "Preparazione"
  );

  const consegnati = filteredOrders.filter(
    (order) => order.status === "Consegnato"
  );

  const archiviati = filteredOrders.filter(
    (order) => order.status === "Archiviato"
  );

  return (
    <div
      style={{
        background: "#f4f7fb",
        minHeight: "100vh",
        padding: "30px",
      }}
    >
      <h1
        style={{
          marginBottom: "10px",
          color: "#2d3436",
        }}
      >
        🍹 Dashboard Pool Bar
      </h1>

      <p
        style={{
          color: "#636e72",
          marginBottom: "25px",
        }}
      >
        Gestione ordini in tempo reale
      </p>

      <div
        style={{
          marginBottom: "25px",
        }}
      >
        <input
          type="text"
          placeholder="🔍 Cerca ombrellone..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            width: "100%",
            maxWidth: "350px",
            padding: "12px",
            borderRadius: "10px",
            border: "1px solid #ccc",
            fontSize: "16px",
          }}
        />
      </div>

      <DashboardStats orders={filteredOrders} />

      <div
        style={{
          display: "flex",
          gap: "20px",
          alignItems: "flex-start",
          flexWrap: "wrap",
        }}
      >
        <OrderColumn
          title="🟥 Nuovi"
          color="#dc3545"
          orders={nuovi}
        />

        <OrderColumn
          title="🟨 Preparazione"
          color="#ffc107"
          orders={preparazione}
        />

        <OrderColumn
          title="🟩 Consegnati"
          color="#198754"
          orders={consegnati}
        />

        <OrderColumn
          title="📦 Archivio"
          color="#6c757d"
          orders={archiviati}
        />
      </div>
    </div>
  );
}

export default Dashboard;