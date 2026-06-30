function CategorySection({
  title,
  icon,
  products,
  ProductCard,
}) {
  return (
    <section style={{ marginBottom: 35 }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          marginBottom: 15,
          borderBottom: "2px solid #e9ecef",
          paddingBottom: 8,
        }}
      >
        <span style={{ fontSize: 28 }}>
          {icon}
        </span>

        <h2
          style={{
            margin: 0,
            color: "#2d3436",
          }}
        >
          {title}
        </h2>
      </div>

      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
        />
      ))}
    </section>
  );
}

export default CategorySection;