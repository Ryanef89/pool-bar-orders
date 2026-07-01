import "./DashboardStats.css";

function DashboardStats({ orders }) {
  const nuovi = orders.filter(
    (o) => o.status === "new"
  ).length;

  const preparazione = orders.filter(
    (o) => o.status === "Preparazione"
  ).length;

  const consegnati = orders.filter(
    (o) => o.status === "Consegnato"
  ).length;

  const archiviati = orders.filter(
    (o) => o.status === "Archiviato"
  ).length;

  const totale = orders.reduce(
    (sum, order) => sum + Number(order.total || 0),
    0
  );

  const media =
    orders.length > 0
      ? totale / orders.length
      : 0;

  const cards = [
    {
      title: "🔔 Nuovi",
      value: nuovi,
      className: "red",
    },
    {
      title: "👨‍🍳 Preparazione",
      value: preparazione,
      className: "yellow",
    },
    {
      title: "✅ Consegnati",
      value: consegnati,
      className: "green",
    },
    {
      title: "📦 Archivio",
      value: archiviati,
      className: "blue",
    },
    {
      title: "💰 Incasso",
      value: `€ ${totale.toFixed(2)}`,
      className: "green",
    },
    {
      title: "💳 Media Ordine",
      value: `€ ${media.toFixed(2)}`,
      className: "blue",
    },
  ];

  return (
    <div className="statsGrid">
      {cards.map((card) => (
        <div
          key={card.title}
          className={`statCard ${card.className}`}
        >
          <h3>{card.title}</h3>
          <span>{card.value}</span>
        </div>
      ))}
    </div>
  );
}

export default DashboardStats;