import { useState } from "react";
import { useCart } from "../context/CartContext";
import { sendOrder } from "../services/orderService";

function CheckoutButton() {
  const { items, total, clearCart } = useCart();

  const [loading, setLoading] = useState(false);

  async function handleOrder() {
    if (items.length === 0) {
      alert("Il carrello è vuoto");
      return;
    }

    const ombrellone = localStorage.getItem("ombrellone") || 1;

    setLoading(true);

    const success = await sendOrder({
      ombrellone: Number(ombrellone),
      items,
      total,
    });

    setLoading(false);

    if (success) {
      alert("Ordine inviato con successo!");

      clearCart();
    } else {
      alert("Errore durante l'invio dell'ordine.");
    }
  }

  return (
    <button
      className="checkoutButton"
      onClick={handleOrder}
      disabled={loading}
    >
      {loading ? "Invio..." : "Invia Ordine"}
    </button>
  );
}

export default CheckoutButton;