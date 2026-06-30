import { useEffect, useState } from "react";

function OrderTimer({ createdAt }) {
  const [minutes, setMinutes] = useState(0);

  useEffect(() => {
    if (!createdAt) return;

    function updateTimer() {
      const created =
        createdAt.seconds * 1000;

      const diff = Date.now() - created;

      setMinutes(
        Math.floor(diff / 60000)
      );
    }

    updateTimer();

    const interval = setInterval(
      updateTimer,
      60000
    );

    return () => clearInterval(interval);
  }, [createdAt]);

  let color = "#198754";

  if (minutes >= 5)
    color = "#ffc107";

  if (minutes >= 10)
    color = "#dc3545";

  return (
    <div
      style={{
        display: "inline-block",
        padding: "6px 12px",
        borderRadius: "20px",
        background: color,
        color: "white",
        fontWeight: "bold",
        marginBottom: 10,
      }}
    >
      🕒 {minutes} min
    </div>
  );
}

export default OrderTimer;