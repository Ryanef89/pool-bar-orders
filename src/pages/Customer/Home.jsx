import { useEffect, useState } from "react";
import "./Home.css";

import menu from "../../data/menu";
import ProductCard from "../../components/ProductCard";
import FloatingCart from "../../components/FloatingCart";

function Home() {
  const [ombrellone, setOmbrellone] = useState(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const numero = params.get("ombrellone");

    if (numero) {
      setOmbrellone(numero);
      localStorage.setItem("ombrellone", numero);
    } else {
      const salvato = localStorage.getItem("ombrellone");
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

        {ombrellone && (
          <h2>🏖 Ombrellone {ombrellone}</h2>
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