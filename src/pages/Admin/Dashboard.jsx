import { useEffect, useRef, useState } from "react";
import { listenOrders } from "../../services/orderListener";
import { closeDay } from "../../services/closeDayService";
import AdminHeader from "../../components/admin/AdminHeader";
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
      new Audio("/sounds/new-order.mp3")
        .play()
        .catch(() => {});
    }

    previousCount.current = orders.length;
  }, [orders]);

  console.log("ORDERS:", orders);

const filteredOrders = orders.filter((order) =>
  order.ombrellone
    ?.toString()
    .includes(search.trim())
);

  const nuovi = filteredOrders.filter(
    (o) => o.status === "new"
  );

  const preparazione = filteredOrders.filter(
    (o) => o.status === "Preparazione"
  );

  const consegnati = filteredOrders.filter(
    (o) => o.status === "Consegnato"
  );

  const archiviati = filteredOrders.filter(
    (o) => o.status === "Archiviato"
  );

  return (
    <div
      style={{
        background: "#f4f7fb",
        minHeight: "100vh",
        padding: 30,
      }}
    >
      <AdminHeader />

      <h1>🍹 Dashboard</h1>

      <input
        type="text"
        placeholder="🔍 Cerca ombrellone..."
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
        style={{
          width: 320,
          padding: 12,
          borderRadius: 10,
          border: "1px solid #ccc",
          marginBottom: 25,
        }}
      />
<div
  style={{
    marginBottom: 25,
  }}
>
  <button
    onClick={async () => {
      const ok = window.confirm(
        "Archiviare tutti gli ordini della giornata?"
      );

      if (!ok) return;

      await closeDay();

      alert("✅ Giornata chiusa con successo.");

      window.location.reload();
    }}
    style={{
      background: "#343a40",
      color: "#fff",
      border: "none",
      padding: "12px 20px",
      borderRadius: 10,
      cursor: "pointer",
      fontWeight: "bold",
    }}
  >
    🌙 Chiusura giornata
  </button>
</div>
      <DashboardStats orders={filteredOrders} />

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(340px,1fr))",
          gap: 20,
        }}
      >
        <OrderColumn
          title={`🟥 Nuovi (${nuovi.length})`}
          color="#dc3545"
          orders={nuovi}
        />

        <OrderColumn
          title={`🟨 Preparazione (${preparazione.length})`}
          color="#ffc107"
          orders={preparazione}
        />

        <OrderColumn
          title={`🟩 Consegnati (${consegnati.length})`}
          color="#198754"
          orders={consegnati}
        />

        <OrderColumn
          title={`📦 Archivio (${archiviati.length})`}
          color="#6c757d"
          orders={archiviati}
        />
      </div>
    </div>
  );
}

export default Dashboard;