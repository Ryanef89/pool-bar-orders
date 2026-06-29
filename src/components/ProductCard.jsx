import { useCart } from "../context/CartContext";
import "./ProductCard.css";

function ProductCard({ product }) {
  const { items, addItem, removeItem } = useCart();

  const cartItem = items.find((item) => item.id === product.id);
  const quantity = cartItem ? cartItem.quantity : 0;

  return (
    <div className="product-card">

      <div className="product-info">
        <h3>{product.name}</h3>
        <span>€ {product.price.toFixed(2)}</span>
      </div>

      <div className="product-actions">

        <button
          className="minus"
          onClick={() => removeItem(product.id)}
          disabled={quantity === 0}
        >
          −
        </button>

        <span className="quantity">
          {quantity}
        </span>

        <button
          className="plus"
          onClick={() => addItem(product)}
        >
          +
        </button>

      </div>

    </div>
  );
}

export default ProductCard;