import "./ProductCard.css";
import { useCart } from "../context/CartContext";

function ProductCard({ product }) {
  const { addItem } = useCart();

  return (
    <div
      className="product-card"
      style={{
        position: "relative",
      }}
    >
      {product.featured && (
        <div
          style={{
            position: "absolute",
            top: 10,
            right: 10,
            background: "#ffc107",
            color: "#000",
            padding: "4px 10px",
            borderRadius: 20,
            fontSize: 12,
            fontWeight: "bold",
          }}
        >
          ⭐ TOP
        </div>
      )}

      <div className="product-image">
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
          />
        ) : (
          <div
            className="placeholder"
            style={{
              fontSize: 42,
            }}
          >
            🥤
          </div>
        )}
      </div>

      <div className="product-info">
        <h3>{product.name}</h3>

        {product.description && (
          <p>{product.description}</p>
        )}

        <div
          className="product-footer"
          style={{
            marginTop: 15,
          }}
        >
          <span
            className="price"
            style={{
              fontSize: 22,
              fontWeight: "bold",
              color: "#0b8457",
            }}
          >
            € {Number(product.price).toFixed(2)}
          </span>

          <button
            onClick={() => addItem(product)}
            style={{
              width: 50,
              height: 50,
              borderRadius: "50%",
              fontSize: 24,
              fontWeight: "bold",
            }}
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;