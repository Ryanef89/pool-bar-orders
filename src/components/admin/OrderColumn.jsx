import "./OrderColumn.css";
import OrderCard from "./OrderCard";

function OrderColumn({ title, color, orders }) {
  return (
    <div className="order-column">
      <div
        className="order-column-header"
        style={{ background: color }}
      >
        <h2>{title}</h2>

        <span>{orders.length}</span>
      </div>

      <div className="order-column-body">
        {orders.length === 0 ? (
          <div className="empty-column">
            Nessun ordine
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
    </div>
  );
}

export default OrderColumn;