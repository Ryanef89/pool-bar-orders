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

  const totale = orders.reduce(
    (sum, order) => sum + Number(order.total || 0),
    0
  );

  return (
    <div className="statsGrid">
      <div className="statCard red">
        <h3>Nuovi</h3>
        <span>{nuovi}</span>
      </div>

      <div className="statCard yellow">
        <h3>Preparazione</h3>
        <span>{preparazione}</span>
      </div>

      <div className="statCard green">
        <h3>Consegnati</h3>
        <span>{consegnati}</span>
      </div>

      <div className="statCard blue">
        <h3>Incasso</h3>
        <span>€ {totale.toFixed(2)}</span>
      </div>
    </div>
  );
}

export default DashboardStats;