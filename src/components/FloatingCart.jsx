import "./FloatingCart.css";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

function FloatingCart() {
  const navigate = useNavigate();

  const { items } = useCart();

  const totalItems = items.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  const totalPrice = items.reduce(
    (sum, item) =>
      sum + item.price * item.quantity,
    0
  );

  if (items.length === 0) return null;

  return (
    <div className="floating-cart">
      <div>
        <strong>{totalItems}</strong> prodotti
        <br />
        <span>€ {totalPrice.toFixed(2)}</span>
      </div>

      <button onClick={() => navigate("/cart")}>
        Vai al carrello →
      </button>
    </div>
  );
}

export default FloatingCart;