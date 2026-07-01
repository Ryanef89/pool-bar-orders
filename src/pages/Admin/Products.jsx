import { useEffect, useMemo, useState } from "react";
import AdminHeader from "../../components/admin/AdminHeader";

import {
  createProduct,
  deleteProduct,
  getProducts,
  toggleAvailability,
  updateProduct,
} from "../../services/productService";

const categories = [
  "Tutte",
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

  const [search, setSearch] = useState("");

  const [filterCategory, setFilterCategory] =
    useState("Tutte");

  const [name, setName] = useState("");

  const [price, setPrice] = useState("");

  const [category, setCategory] =
    useState("Bibite");

  const [description, setDescription] =
    useState("");

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

    setDescription("");
  }

  async function saveProduct() {
    if (!name.trim() || !price) {
      alert("Compila tutti i campi");

      return;
    }

    const product = {
      name: name.trim(),

      price: Number(price),

      category,

      description,

      available: true,

      featured: false,

      image: "",
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

    setDescription(
      product.description || ""
    );
  }

  async function toggleProduct(product) {
    await toggleAvailability(
      product.id,
      !product.available
    );

    await loadProducts();
  }

  async function removeProduct(id) {
    if (
      !window.confirm(
        "Eliminare il prodotto?"
      )
    )
      return;

    await deleteProduct(id);

    await loadProducts();
  }

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const okCategory =
        filterCategory === "Tutte" ||
        product.category === filterCategory;

      const okSearch = product.name
        .toLowerCase()
        .includes(search.toLowerCase());

      return okCategory && okSearch;
    });
  }, [
    products,
    search,
    filterCategory,
  ]);

  return (
    <div
      style={{
        padding: 30,
        background: "#f4f6f9",
        minHeight: "100vh",
      }}
    >
      <AdminHeader />

      <h1>📦 Gestione Prodotti</h1>

      <div
        style={{
          display: "grid",

          gridTemplateColumns:
            "400px 1fr",

          gap: 30,

          alignItems: "start",
        }}
      >
                <div
          style={{
            background: "#fff",
            padding: 20,
            borderRadius: 15,
            boxShadow: "0 5px 15px rgba(0,0,0,.08)",
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

            <textarea
              rows={4}
              placeholder="Descrizione"
              value={description}
              onChange={(e) =>
                setDescription(
                  e.target.value
                )
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
                setCategory(
                  e.target.value
                )
              }
            >
              {categories
                .filter(
                  (c) => c !== "Tutte"
                )
                .map((cat) => (
                  <option key={cat}>
                    {cat}
                  </option>
                ))}
            </select>

            <button
              onClick={saveProduct}
            >
              {editingId
                ? "💾 Salva"
                : "➕ Aggiungi"}
            </button>

            {editingId && (
              <button
                onClick={resetForm}
              >
                ❌ Annulla
              </button>
            )}
          </div>
        </div>

        <div>
          <div
            style={{
              display: "flex",
              gap: 15,
              marginBottom: 20,
            }}
          >
            <input
              placeholder="🔍 Cerca..."
              value={search}
              onChange={(e) =>
                setSearch(
                  e.target.value
                )
              }
              style={{
                flex: 1,
              }}
            />

            <select
              value={filterCategory}
              onChange={(e) =>
                setFilterCategory(
                  e.target.value
                )
              }
            >
              {categories.map((cat) => (
                <option key={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {filteredProducts.length ===
          0 ? (
            <p>
              Nessun prodotto.
            </p>
          ) : (
            filteredProducts.map(
              (product) => (
                              <div
                key={product.id}
                style={{
                  background: "#fff",
                  borderRadius: 15,
                  padding: 20,
                  marginBottom: 15,
                  boxShadow:
                    "0 5px 15px rgba(0,0,0,.08)",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent:
                      "space-between",
                    alignItems: "center",
                  }}
                >
                  <div>
                    <h3
                      style={{
                        margin: 0,
                      }}
                    >
                      {product.name}
                    </h3>

                    <p
                      style={{
                        marginTop: 8,
                        color: "#666",
                      }}
                    >
                      {product.description ||
                        "Nessuna descrizione"}
                    </p>

                    <p>
                      <strong>
                        Categoria:
                      </strong>{" "}
                      {product.category}
                    </p>

                    <p>
                      <strong>
                        Prezzo:
                      </strong>{" "}
                      €{" "}
                      {Number(
                        product.price
                      ).toFixed(2)}
                    </p>

                    <p>
                      {product.available
                        ? "✅ Disponibile"
                        : "❌ Non disponibile"}
                    </p>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      flexDirection:
                        "column",
                      gap: 10,
                    }}
                  >
                    <button
                      onClick={() =>
                        editProduct(
                          product
                        )
                      }
                    >
                      ✏️ Modifica
                    </button>

                    <button
                      onClick={() =>
                        toggleProduct(
                          product
                        )
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
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Products;