import { useEffect, useState } from "react";

import {
  createProduct,
  deleteProduct,
  getProducts,
  toggleAvailability,
  updateProduct,
} from "../../services/productService";

const categories = [
  "Bibite",
  "Birre",
  "Cocktail",
  "Panini",
  "Snack",
  "Gelati",
];

function Products() {
  const [products, setProducts] = useState([]);

  const [editingId, setEditingId] = useState(null);

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Bibite");

  useEffect(() => {
    loadProducts();
  }, []);

  async function loadProducts() {
    const data = await getProducts();
    setProducts(data);
  }

  function resetForm() {
    setEditingId(null);
    setName("");
    setPrice("");
    setCategory("Bibite");
  }

  async function saveProduct() {
    if (!name.trim() || !price) {
      alert("Compila tutti i campi.");
      return;
    }

    const product = {
      name: name.trim(),
      price: Number(price),
      category,
      available: true,
      image: "",
      description: "",
    };

    if (editingId) {
      await updateProduct(editingId, product);
    } else {
      await createProduct({
        ...product,
        sortOrder: Date.now(),
      });
    }

    resetForm();
    await loadProducts();
  }

  function editProduct(product) {
    setEditingId(product.id);
    setName(product.name);
    setPrice(product.price);
    setCategory(product.category);
  }

  async function toggleProduct(product) {
    await toggleAvailability(
      product.id,
      !product.available
    );

    await loadProducts();
  }

  async function removeProduct(id) {
    const conferma = window.confirm(
      "Vuoi eliminare questo prodotto?"
    );

    if (!conferma) return;

    await deleteProduct(id);

    if (editingId === id) {
      resetForm();
    }

    await loadProducts();
  }

  return (
    <div style={{ padding: 30 }}>
      <h1>📦 Gestione Prodotti</h1>

      <div
        style={{
          background: "#fff",
          padding: 20,
          borderRadius: 12,
          marginBottom: 30,
          boxShadow: "0 2px 8px rgba(0,0,0,.08)",
          maxWidth: 500,
        }}
      >
        <h2>
          {editingId
            ? "✏️ Modifica prodotto"
            : "➕ Nuovo prodotto"}
        </h2>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 12,
            marginTop: 20,
          }}
        >
          <input
            placeholder="Nome prodotto"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
          />

          <input
            type="number"
            placeholder="Prezzo"
            value={price}
            onChange={(e) =>
              setPrice(e.target.value)
            }
          />

          <select
            value={category}
            onChange={(e) =>
              setCategory(e.target.value)
            }
          >
            {categories.map((cat) => (
              <option key={cat}>
                {cat}
              </option>
            ))}
          </select>

          <button onClick={saveProduct}>
            {editingId
              ? "💾 Salva modifiche"
              : "➕ Aggiungi prodotto"}
          </button>

          {editingId && (
            <button onClick={resetForm}>
              ❌ Annulla modifica
            </button>
          )}
        </div>
      </div>

      <h2>Prodotti presenti</h2>

      {products.length === 0 ? (
        <p>Nessun prodotto presente.</p>
      ) : (
        products.map((product) => (
          <div
            key={product.id}
            style={{
              background: "#fff",
              padding: 20,
              marginBottom: 15,
              borderRadius: 12,
              boxShadow: "0 2px 8px rgba(0,0,0,.08)",
            }}
          >
            <h3>{product.name}</h3>

            <p>
              <strong>Prezzo:</strong> €
              {" "}
              {Number(product.price).toFixed(2)}
            </p>

            <p>
              <strong>Categoria:</strong>{" "}
              {product.category}
            </p>

            <p>
              <strong>Stato:</strong>{" "}
              {product.available
                ? "✅ Disponibile"
                : "❌ Non disponibile"}
            </p>

            <div
              style={{
                display: "flex",
                gap: 10,
                flexWrap: "wrap",
                marginTop: 15,
              }}
            >
              <button
                onClick={() =>
                  editProduct(product)
                }
              >
                ✏️ Modifica
              </button>

              <button
                onClick={() =>
                  toggleProduct(product)
                }
              >
                {product.available
                  ? "🚫 Disattiva"
                  : "✅ Attiva"}
              </button>

              <button
                onClick={() =>
                  removeProduct(product.id)
                }
              >
                🗑 Elimina
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default Products;