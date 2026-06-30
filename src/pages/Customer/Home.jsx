import { useEffect, useMemo, useState } from "react";
import "./Home.css";

import ProductCard from "../../components/ProductCard";
import FloatingCart from "../../components/FloatingCart";
import { getAvailableProducts } from "../../services/productService";

const categoryOrder = [
  "Bibite",
  "Birre",
  "Cocktail",
  "Panini",
  "Snack",
  "Gelati",
];

const categoryIcons = {
  Bibite: "🥤",
  Birre: "🍺",
  Cocktail: "🍹",
  Panini: "🍔",
  Snack: "🍟",
  Gelati: "🍦",
};

function Home() {
  const [products, setProducts] = useState([]);
  const [ombrellone, setOmbrellone] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadProducts();

    const params = new URLSearchParams(window.location.search);

    const numero = params.get("ombrellone");

    if (numero) {
      localStorage.setItem("ombrellone", numero);
      setOmbrellone(numero);
    } else {
      const saved = localStorage.getItem("ombrellone");

      if (saved) {
        setOmbrellone(saved);
      }
    }
  }, []);

  async function loadProducts() {
    const data = await getAvailableProducts();
    setProducts(data);
  }

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const text = (
        product.name +
        " " +
        (product.description || "")
      ).toLowerCase();

      return text.includes(search.toLowerCase());
    });
  }, [products, search]);

  const groupedProducts = useMemo(() => {
    return filteredProducts.reduce((groups, product) => {
      if (!groups[product.category]) {
        groups[product.category] = [];
      }

      groups[product.category].push(product);

      return groups;
    }, {});
  }, [filteredProducts]);

  return (
    <div className="home">
      <header className="header">
        <h1>🏖 Toscana Sport Resort</h1>

        <p>Pool Bar</p>

        <div className="tableBox">
          {ombrellone
            ? `🏖 Ombrellone ${ombrellone}`
            : "⚠️ Nessun ombrellone"}
        </div>
      </header>

      <div className="searchBox">
        <input
          type="text"
          placeholder="🔍 Cerca prodotto..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />
      </div>

      {filteredProducts.length === 0 ? (
        <div className="emptyProducts">
          Nessun prodotto trovato.
        </div>
      ) : (
        categoryOrder.map((category) => {
          if (!groupedProducts[category]) return null;

          return (
            <div key={category}>
              <div className="categoryTitle">
                <span>
                  {categoryIcons[category]}
                </span>

                <span>{category}</span>
              </div>

              {groupedProducts[category].map(
                (product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                  />
                )
              )}
            </div>
          );
        })
      )}

      <FloatingCart />
    </div>
  );
}

export default Home;