import { useEffect, useState } from "react";
import { listenOrders } from "../../services/orderListener";
import { updateOrderStatus } from "../../services/updateOrderStatus";

function Dashboard() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const unsubscribe = listenOrders(setOrders);

    return () => unsubscribe();
  }, []);

  return (
    <div style={{ padding: 30 }}>
      <h1>🍹 Dashboard Bar</h1>

      <h2>Ordini Live</h2>

      {orders.length === 0 && <p>Nessun ordine.</p>}

      {orders.map((order) => (
        <div
          key={order.id}
          style={{
            border: "1px solid #ddd",
            padding: 20,
            marginBottom: 20,
            borderRadius: 12,
            background: "white",
          }}
        >
          <h3>🏖 Ombrellone {order.ombrellone}</h3>

          <p>
            <strong>Stato:</strong> {order.status}
          </p>

          <hr />

          {order.items.map((item) => (
            <div key={item.id}>
              {item.quantity} × {item.name}
            </div>
          ))}

          <hr />

          <h3>Totale € {order.total.toFixed(2)}</h3>

          <div style={{ marginTop: 20 }}>
            <button
              onClick={() =>
                updateOrderStatus(order.id, "Preparazione")
              }
            >
              👨‍🍳 In preparazione
            </button>

            <button
              style={{ marginLeft: 10 }}
              onClick={() =>
                updateOrderStatus(order.id, "Consegnato")
              }
            >
              ✅ Consegnato
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Dashboard;