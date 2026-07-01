import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { sendOrder } from "../../services/orderService";

function Cart() {
  const navigate = useNavigate();

  const {
    items,
    total,
    notes,
    setNotes,
    increaseQuantity,
    decreaseQuantity,
    removeItem,
    clearCart,
  } = useCart();

  const [sending, setSending] = useState(false);

  async function handleSendOrder() {
    if (items.length === 0 || sending) return;

    const ombrellone =
      localStorage.getItem("ombrellone") || "";

    if (!ombrellone) {
      alert("Nessun ombrellone selezionato.");
      return;
    }

    setSending(true);
console.log("ORDINE DA INVIARE:", {
  ombrellone,
  items,
  total,
  notes,
});
    const result = await sendOrder({
      ombrellone,
      items,
      total,
      notes,
    });

    if (result.success) {
      clearCart();

      alert("✅ Ordine inviato con successo!");

      navigate("/");
    } else {
      alert("❌ Errore durante l'invio dell'ordine.");
    }

    setSending(false);
  }

  return (
    <div
      style={{
        maxWidth: 700,
        margin: "40px auto",
        padding: 20,
      }}
    >
      <button
        onClick={() => navigate("/")}
        style={{
          marginBottom: 20,
        }}
      >
        ← Torna al menu
      </button>

      <h1>🛒 Carrello</h1>

      {items.length === 0 ? (
        <p>Il carrello è vuoto.</p>
      ) : (
        <>
          {items.map((item) => (
            <div
              key={item.id}
              style={{
                background: "#fff",
                padding: 20,
                marginBottom: 15,
                borderRadius: 12,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                boxShadow:
                  "0 2px 8px rgba(0,0,0,.08)",
              }}
            >
              <div>
                <h3>{item.name}</h3>

                <p>
                  € {Number(item.price).toFixed(2)}
                </p>
              </div>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                }}
              >
                <button
                  onClick={() =>
                    decreaseQuantity(item.id)
                  }
                >
                  ➖
                </button>

                <strong>{item.quantity}</strong>

                <button
                  onClick={() =>
                    increaseQuantity(item.id)
                  }
                >
                  ➕
                </button>

                <button
                  onClick={() =>
                    removeItem(item.id)
                  }
                >
                  🗑️
                </button>
              </div>
            </div>
          ))}

          <textarea
            rows={4}
            placeholder="Note per il bar..."
            value={notes}
            onChange={(e) =>
              setNotes(e.target.value)
            }
            style={{
              width: "100%",
              padding: 10,
              marginTop: 20,
              borderRadius: 10,
            }}
          />

          <h2
            style={{
              marginTop: 25,
            }}
          >
            Totale € {total.toFixed(2)}
          </h2>

          <button
            disabled={sending}
            onClick={handleSendOrder}
            style={{
              width: "100%",
              padding: 15,
              marginTop: 20,
              fontSize: 18,
            }}
          >
            {sending
              ? "Invio..."
              : "🚀 Invia Ordine"}
          </button>
        </>
      )}
    </div>
  );
}

export default Cart;