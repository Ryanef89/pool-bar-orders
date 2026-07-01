import AdminHeader from "../../components/admin/AdminHeader";

function Statistiche() {
  const cards = [
    { title: "💰 Incasso Oggi", value: "€ 0,00" },
    { title: "🧾 Ordini", value: "0" },
    { title: "🏖 Ombrellone Top", value: "-" },
    { title: "🥤 Prodotto Top", value: "-" },
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
          gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
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
              boxShadow: "0 5px 15px rgba(0,0,0,.08)",
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