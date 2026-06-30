import OrderCard from "./OrderCard";

function OrderColumn({ title, color, orders }) {
  return (
    <div
      style={{
        flex: 1,
        minWidth: "320px",
        background: "#ffffff",
        borderRadius: "15px",
        padding: "20px",
        boxShadow: "0 4px 12px rgba(0,0,0,.08)"
      }}
    >
      <h2
        style={{
          color,
          marginBottom: "20px",
          borderBottom: `3px solid ${color}`,
          paddingBottom: "10px"
        }}
      >
        {title} ({orders.length})
      </h2>

      {orders.length === 0 ? (
        <p style={{ color: "#777" }}>Nessun ordine</p>
      ) : (
        orders.map(order => (
          <OrderCard
            key={order.id}
            order={order}
          />
        ))
      )}
    </div>
  );
}

export default OrderColumn;