import { useEffect, useState } from "react";
import "./Home.css";

import menu from "../../data/menu";
import ProductCard from "../../components/ProductCard";
import FloatingCart from "../../components/FloatingCart";

function Home() {
  const [ombrellone, setOmbrellone] = useState("");

  useEffect(() => {
    console.log("URL completa:", window.location.href);

    const params = new URLSearchParams(window.location.search);

    console.log("Query string:", window.location.search);

    const numero = params.get("ombrellone");

    console.log("Parametro ombrellone:", numero);

    if (numero) {
      localStorage.setItem("ombrellone", numero);
      setOmbrellone(numero);
    } else {
      const salvato = localStorage.getItem("ombrellone");

      console.log("Ombrellone salvato:", salvato);

      if (salvato) {
        setOmbrellone(salvato);
      }
    }
  }, []);

  return (
    <div className="home">
      <header className="header">
        <h1>🏖 Toscana Sport Resort</h1>
        <p>Pool Bar</p>

        {ombrellone ? (
          <div
            style={{
              background: "#198754",
              color: "#fff",
              padding: "15px",
              borderRadius: "12px",
              marginTop: "20px",
              fontSize: "22px",
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            🏖 Ombrellone {ombrellone}
          </div>
        ) : (
          <div
            style={{
              background: "#ffc107",
              color: "#000",
              padding: "15px",
              borderRadius: "12px",
              marginTop: "20px",
              textAlign: "center",
            }}
          >
            ⚠️ Nessun ombrellone selezionato
          </div>
        )}
      </header>

      <h2>Bibite</h2>

      {menu.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
        />
      ))}

      <FloatingCart />
    </div>
  );
}

export default Home;