import { useEffect, useState } from "react";
import "./QRCodes.css";
import AdminHeader from "../../components/admin/AdminHeader";
import { QRCodeSVG } from "qrcode.react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { getSettings } from "../../services/settingsService";

function QRCodes() {
  const baseUrl = "https://pool-bar-orders.web.app";

  const [settings, setSettings] = useState({
    ombrelloni: 40,
    resortName: "Toscana Sport Resort",
    barName: "Pool Bar",
    qrLayout: 12,
  });

  const [selected, setSelected] = useState(1);

  useEffect(() => {
    loadSettings();
  }, []);

  async function loadSettings() {
    const data = await getSettings();

    if (data) {
      setSettings((prev) => ({
        ...prev,
        ...data,
      }));
    }
  }

  function printLabels() {
    window.print();
  }

  async function exportPDF() {
    const element = document.getElementById("labels");

    const canvas = await html2canvas(element, {
      scale: 2,
      backgroundColor: "#ffffff",
    });

    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");

    const pageWidth = 210;

    const pageHeight =
      (canvas.height * pageWidth) /
      canvas.width;

    pdf.addImage(
      imgData,
      "PNG",
      0,
      0,
      pageWidth,
      pageHeight
    );

    pdf.save("QR-Code-Pool-Bar.pdf");
  }

  return (
    <div className="page">
      <AdminHeader />

      <div className="toolbar">
        <div>
          <h1>📱 QR Code Ombrelloni</h1>

          <p>
            {settings.resortName}
            {" • "}
            {settings.barName}
          </p>
        </div>

        <div
          style={{
            display: "flex",
            gap: 12,
            flexWrap: "wrap",
            alignItems: "center",
          }}
        >
          <label>Ombrellone</label>

          <select
            value={selected}
            onChange={(e) =>
              setSelected(
                Number(e.target.value)
              )
            }
          >
            {Array.from(
              {
                length:
                  settings.ombrelloni,
              },
              (_, i) => i + 1
            ).map((numero) => (
              <option
                key={numero}
                value={numero}
              >
                {numero}
              </option>
            ))}
          </select>

          <button
            onClick={() =>
              window.open(
                `${baseUrl}/?ombrellone=${selected}`,
                "_blank"
              )
            }
          >
            🔍 Apri QR
          </button>

          <button
            onClick={printLabels}
          >
            🖨️ Stampa
          </button>

          <button
            onClick={exportPDF}
          >
            📄 PDF
          </button>
        </div>
      </div>

      <div
        id="labels"
        className="labels"
      >
        {Array.from(
          {
            length:
              settings.ombrelloni,
          },
          (_, i) => i + 1
        ).map((numero) => (
          <div
            key={numero}
            className="label"
          >            <img
              src="/logo.png"
              alt="Logo Resort"
              className="logo"
            />

            <div className="resort">
              {settings.resortName}
            </div>

            <div className="poolbar">
              🍹 {settings.barName}
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "center",
                margin: "20px 0",
              }}
            >
              <QRCodeSVG
                value={`${baseUrl}/?ombrellone=${numero}`}
                size={170}
                bgColor="#ffffff"
                fgColor="#000000"
                includeMargin={true}
              />
            </div>

            <div className="scan">
              📱 Scansiona per ordinare
            </div>

            <div
              style={{
                fontSize: 14,
                color: "#666",
                marginTop: 6,
              }}
            >
              https://pool-bar-orders.web.app
            </div>

            <div className="number">
              OMBRELLONE {numero}
            </div>

            <button
              style={{
                marginTop: 20,
                width: "100%",
                padding: 10,
                borderRadius: 8,
                border: "none",
                background: "#0b8457",
                color: "#fff",
                cursor: "pointer",
              }}
              onClick={() =>
                window.open(
                  `${baseUrl}/?ombrellone=${numero}`,
                  "_blank"
                )
              }
            >
              Apri questo QR
            </button>

          </div>
        ))}
      </div>    </div>
  );
}

export default QRCodes;