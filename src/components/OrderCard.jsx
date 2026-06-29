function OrderCard({ order }) {
  return (
    <div
      style={{
        background: "white",
        padding: "20px",
        borderRadius: "15px",
        marginBottom: "20px",
        boxShadow: "0 5px 12px rgba(0,0,0,.1)"
      }}
    >
      <h3>🏖 Ombrellone {order.ombrellone}</h3>

      <hr />

      {order.items.map((item) => (
        <p key={item.id}>
          {item.quantity} × {item.name}
        </p>
      ))}

      <h4>Totale € {order.total.toFixed(2)}</h4>

      <span
        style={{
          background: "#ffc107",
          padding: "6px 12px",
          borderRadius: "10px"
        }}
      >
        {order.status}
      </span>
    </div>
  );
}

export default OrderCard;