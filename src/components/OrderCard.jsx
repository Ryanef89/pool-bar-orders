import { updateOrderStatus } from "../services/updateOrderStatus";

function OrderCard({ order }) {
  function getStatusColor(status) {
    switch (status) {
      case "new":
        return "#dc3545"; // rosso
      case "Preparazione":
        return "#ffc107"; // giallo
      case "Consegnato":
        return "#28a745"; // verde
      default:
        return "#6c757d";
    }
  }

  return (
    <div
      style={{
        background: "white",
        padding: "20px",
        borderRadius: "15px",
        marginBottom: "20px",
        boxShadow: "0 5px 15px rgba(0,0,0,.15)",
        borderLeft: `8px solid ${getStatusColor(order.status)}`
      }}
    >
      <h2>🏖 Ombrellone {order.ombrellone}</h2>

      <div
        style={{
          display: "inline-block",
          background: getStatusColor(order.status),
          color: "white",
          padding: "6px 12px",
          borderRadius: "20px",
          fontWeight: "bold",
          marginBottom: "15px"
        }}
      >
        {order.status}
      </div>

      <hr />

      {order.items.map((item) => (
        <div
          key={item.id}
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "8px",
            fontSize: "18px"
          }}
        >
          <span>{item.name}</span>
          <strong>x{item.quantity}</strong>
        </div>
      ))}

      <hr />

      <h2 style={{ color: "#198754" }}>
        Totale € {order.total.toFixed(2)}
      </h2>

      <div
        style={{
          marginTop: "20px",
          display: "flex",
          gap: "10px"
        }}
      >
        <button
          onClick={() =>
            updateOrderStatus(order.id, "Preparazione")
          }
        >
          👨‍🍳 Preparazione
        </button>

        <button
          onClick={() =>
            updateOrderStatus(order.id, "Consegnato")
          }
        >
          ✅ Consegnato
        </button>
      </div>
    </div>
  );
}

export default OrderCard;