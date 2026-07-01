import AdminHeader from "../../components/admin/AdminHeader";
import { QRCodeSVG } from "qrcode.react";

function QRCodes() {
  const totalOmbrelloni = 40;

  const baseUrl = window.location.origin;

  return (
    <div
      style={{
        padding: 30,
        background: "#f4f7fb",
        minHeight: "100vh",
      }}
    >
      <AdminHeader />

      <h1>📱 QR Code Ombrelloni</h1>

      <p style={{ marginBottom: 30 }}>
        Scansionando il QR il cliente accederà
        direttamente al menu con l'ombrellone già
        selezionato.
      </p>

      <div
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
              padding: 20,
              borderRadius: 15,
              textAlign: "center",
              boxShadow:
                "0 5px 15px rgba(0,0,0,.08)",
            }}
          >
            <QRCodeSVG
              value={`${baseUrl}/?ombrellone=${numero}`}
              size={140}
            />

            <h3
              style={{
                marginTop: 15,
              }}
            >
              🏖 {numero}
            </h3>
          </div>
        ))}
      </div>
    </div>
  );
}

export default QRCodes;