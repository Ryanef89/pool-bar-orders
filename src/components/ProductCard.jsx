import "./ProductCard.css";
import { useCart } from "../context/CartContext";

function ProductCard({ product }) {
  const { addItem } = useCart();

  return (
    <div className="product-card">
      <div className="product-image">
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
          />
        ) : (
          <div className="placeholder">
            🥤
          </div>
        )}
      </div>

      <div className="product-info">
        <h3>{product.name}</h3>

        {product.description && (
          <p>{product.description}</p>
        )}

        <div className="product-footer">
          <span className="price">
            € {Number(product.price).toFixed(2)}
          </span>

          <button
            onClick={() => addItem(product)}
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;