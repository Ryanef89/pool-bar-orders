import { useEffect, useState } from "react";
import AdminHeader from "../../components/admin/AdminHeader";
import { getStatistics } from "../../services/statisticsService";

function Statistiche() {
  const [stats, setStats] = useState({
    revenue: 0,
    totalOrders: 0,
    average: 0,
    topUmbrella: "-",
    topProduct: "-",
  });

  useEffect(() => {
    loadStatistics();
  }, []);

  async function loadStatistics() {
    const data = await getStatistics();
    setStats(data);
  }

  const cards = [
    {
      title: "💰 Incasso Totale",
      value: `€ ${stats.revenue.toFixed(2)}`,
    },
    {
      title: "🧾 Ordini Totali",
      value: stats.totalOrders,
    },
    {
      title: "💳 Scontrino Medio",
      value: `€ ${stats.average.toFixed(2)}`,
    },
    {
      title: "🏖 Ombrellone Top",
      value: stats.topUmbrella,
    },
    {
      title: "🥤 Prodotto Top",
      value: stats.topProduct,
    },
  ];

  return (
    <div
      style={{
        padding: 30,
        background: "#f4f6f9",
        minHeight: "100vh",
      }}
    >
      <AdminHeader />

      <h1>📊 Statistiche</h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(250px,1fr))",
          gap: 20,
          marginTop: 30,
        }}
      >
        {cards.map((card) => (
          <div
            key={card.title}
            style={{
              background: "#fff",
              padding: 25,
              borderRadius: 15,
              boxShadow:
                "0 5px 15px rgba(0,0,0,.08)",
            }}
          >
            <h3>{card.title}</h3>

            <h1
              style={{
                color: "#0b8457",
                marginTop: 15,
              }}
            >
              {card.value}
            </h1>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Statistiche;