import "./FloatingCart.css";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

function FloatingCart() {
  const navigate = useNavigate();

  const { cart } = useCart();

  const totalItems = cart.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  if (cart.length === 0) return null;

  return (
    <div className="floating-cart">
      <div>
        <strong>{totalItems}</strong> prodotti
        <br />
        <span>€ {totalPrice.toFixed(2)}</span>
      </div>

      <button
        onClick={() => navigate("/cart")}
      >
        Vai al carrello →
      </button>
    </div>
  );
}

export default FloatingCart;