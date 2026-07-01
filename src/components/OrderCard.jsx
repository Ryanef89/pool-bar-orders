import "./OrderCard.css";
import { useNavigate } from "react-router-dom";
import OrderTimer from "./admin/OrderTimer";
import { updateOrderStatus } from "../services/updateOrderStatus";
import { announceOrder } from "../services/speechService";

function OrderCard({ order }) {
  const navigate = useNavigate();

  function getStatusColor(status) {
    switch (status) {
      case "new":
        return "#dc3545";

      case "Preparazione":
        return "#ffc107";

      case "Consegnato":
        return "#198754";

      case "Archiviato":
        return "#6c757d";

      default:
        return "#6c757d";
    }
  }

  function getStatusLabel(status) {
    switch (status) {
      case "new":
        return "🟥 NUOVO";

      case "Preparazione":
        return "🟨 PREPARAZIONE";

      case "Consegnato":
        return "🟩 CONSEGNATO";

      case "Archiviato":
        return "📦 ARCHIVIATO";

      default:
        return status;
    }
  }

  return (
    <div
      className="order-card"
      style={{
        borderLeft: `8px solid ${getStatusColor(
          order.status
        )}`,
      }}
    >
      <div className="order-header">
        <h2
          style={{
            cursor: "pointer",
          }}
          onClick={() =>
            navigate("/admin/ombrelloni")
          }
        >
          🏖 OMBRELLONE {order.ombrellone}
        </h2>

        {order.createdAt && (
          <OrderTimer
            createdAt={order.createdAt}
          />
        )}
      </div>

      <div
        className="status"
        style={{
          background: getStatusColor(
            order.status
          ),
        }}
      >
        {getStatusLabel(order.status)}
      </div>

      <div className="items">
        {order.items.map((item) => (
          <div
            key={item.id}
            className="item"
          >
            <span>
              {item.name}
            </span>

            <strong>
              × {item.quantity}
            </strong>
          </div>
        ))}
      </div>

      {order.notes &&
        order.notes.trim() !== "" && (
          <div className="notes">
            <div className="notes-title">
              📝 NOTE CLIENTE
            </div>

            {order.notes}
          </div>
        )}

      <div className="total">
        💶 €
        {" "}
        {Number(order.total).toFixed(2)}
      </div>

      <div className="actions">
        <button
          className="prep"
          onClick={() =>
            updateOrderStatus(
              order.id,
              "Preparazione"
            )
          }
        >
          👨‍🍳 Preparazione
        </button>

        <button
          className="done"
          onClick={async () => {
            await updateOrderStatus(
              order.id,
              "Consegnato"
            );

            announceOrder(
              order.ombrellone
            );
          }}
        >
          ✅ Consegnato
        </button>

        <button
          className="archive"
          onClick={() =>
            updateOrderStatus(
              order.id,
              "Archiviato"
            )
          }
        >
          📦 Archivia
        </button>

        <button
          className="view"
          onClick={() =>
            navigate("/admin/ombrelloni")
          }
        >
          👁 Ombrellone
        </button>
      </div>
    </div>
  );
}

export default OrderCard;