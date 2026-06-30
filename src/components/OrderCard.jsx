import "./OrderCard.css";
import OrderTimer from "./admin/OrderTimer";
import { updateOrderStatus } from "../services/updateOrderStatus";
import { announceOrder } from "../services/speechService";

function OrderCard({ order }) {
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

  return (
    <div
      className="order-card"
      style={{
        borderLeft: `8px solid ${getStatusColor(order.status)}`,
      }}
    >
      <div className="order-header">
        <h2>🏖 {order.ombrellone}</h2>

        {order.createdAt && (
          <OrderTimer createdAt={order.createdAt} />
        )}
      </div>

      <div
        className="status"
        style={{
          background: getStatusColor(order.status),
        }}
      >
        {order.status}
      </div>

      <div className="items">
        {order.items.map((item) => (
          <div
            key={item.id}
            className="item"
          >
            <span>{item.name}</span>

            <strong>x{item.quantity}</strong>
          </div>
        ))}
      </div>

      <div className="total">
        € {Number(order.total).toFixed(2)}
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
          👨‍🍳
        </button>

        <button
          className="done"
          onClick={async () => {
            await updateOrderStatus(
              order.id,
              "Consegnato"
            );

            announceOrder(order.ombrellone);
          }}
        >
          ✅
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
          📦
        </button>
      </div>
    </div>
  );
}

export default OrderCard;