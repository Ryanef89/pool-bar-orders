import AdminHeader from "../../components/admin/AdminHeader";
import { QRCodeSVG } from "qrcode.react";

function QRCodes() {
  const totalOmbrelloni = 40;
  const baseUrl = window.location.origin;

  function printQR() {
    window.print();
  }

  return (
    <div
      style={{
        padding: 30,
        background: "#f4f7fb",
        minHeight: "100vh",
      }}
    >
      <AdminHeader />

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 30,
        }}
      >
        <h1>📱 QR Code Ombrelloni</h1>

        <button onClick={printQR}>
          🖨️ Stampa QR
        </button>
      </div>

      <div
        id="print-area"
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fill,minmax(180px,1fr))",
          gap: 25,
        }}
      >
        {Array.from(
          { length: totalOmbrelloni },
          (_, i) => i + 1
        ).map((numero) => (
          <div
            key={numero}
            style={{
              background: "#fff",
              border: "1px solid #ddd",
              borderRadius: 12,
              padding: 20,
              textAlign: "center",
            }}
          >
            <QRCodeSVG
              value={`${baseUrl}/?ombrellone=${numero}`}
              size={150}
            />

            <h2
              style={{
                marginTop: 15,
              }}
            >
              🏖 {numero}
            </h2>
          </div>
        ))}
      </div>
    </div>
  );
}

export default QRCodes;