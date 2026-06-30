import { useEffect, useState } from "react";
import { listenOrders } from "../../services/orderListener";
import OrderCard from "../../components/OrderCard";

function Dashboard() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const unsubscribe = listenOrders(setOrders);
    return () => unsubscribe();
  }, []);

  return (
    <div
      style={{
        background: "#f4f6f9",
        minHeight: "100vh",
        padding: "30px"
      }}
    >
      <h1 style={{ marginBottom: "10px" }}>
        🍹 Dashboard Pool Bar
      </h1>

      <p
        style={{
          color: "#666",
          marginBottom: "30px"
        }}
      >
        Ordini in tempo reale
      </p>

      {orders.length === 0 ? (
        <div
          style={{
            background: "white",
            padding: "30px",
            borderRadius: "15px",
            textAlign: "center"
          }}
        >
          Nessun ordine.
        </div>
      ) : (
        orders.map((order) => (
          <OrderCard
            key={order.id}
            order={order}
          />
        ))
      )}
    </div>
  );
}

export default Dashboard;