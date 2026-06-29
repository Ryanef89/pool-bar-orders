import "./FloatingCart.css";
import { useCart } from "../context/CartContext";
import CheckoutButton from "./CheckoutButton";

function FloatingCart() {
  const { items, total } = useCart();

  const quantity = items.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  if (quantity === 0) return null;

  return (
    <div className="cartBar">

      <div className="cartInfo">

        <strong>{quantity} articoli</strong>

        <span>Totale € {total.toFixed(2)}</span>

      </div>

      <CheckoutButton />

    </div>
  );
}

export default FloatingCart;