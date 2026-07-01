import { useState } from "react";
import "./QRCodes.css";
import AdminHeader from "../../components/admin/AdminHeader";
import { QRCodeSVG } from "qrcode.react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

function QRCodes() {
  const totalOmbrelloni = 40;

  const baseUrl =
    "https://pool-bar-orders.web.app";

  const [selected, setSelected] =
    useState(1);

  function printLabels() {
    window.print();
  }

  async function exportPDF() {
    const element =
      document.getElementById("labels");

    const canvas = await html2canvas(
      element,
      {
        scale: 2,
      }
    );

    const imgData =
      canvas.toDataURL("image/png");

    const pdf = new jsPDF(
      "p",
      "mm",
      "a4"
    );

    const width = 210;

    const height =
      (canvas.height * width) /
      canvas.width;

    pdf.addImage(
      imgData,
      "PNG",
      0,
      0,
      width,
      height
    );

    pdf.save(
      "QR-Code-Pool-Bar.pdf"
    );
  }

  return (
    <div className="page">
      <AdminHeader />

      <div className="toolbar">
        <div>
          <h1>
            📱 QR Code Ombrelloni
          </h1>

          <p>
            Toscana Sport Resort
            • Pool Bar
          </p>
        </div>

        <div
          style={{
            display: "flex",
            gap: 15,
            flexWrap: "wrap",
            alignItems: "center",
          }}
        >
          <label>
            Ombrellone
          </label>

          <select
            value={selected}
            onChange={(e) =>
              setSelected(
                Number(
                  e.target.value
                )
              )
            }
          >
            {Array.from(
              {
                length:
                  totalOmbrelloni,
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
            🔍 Apri
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
              totalOmbrelloni,
          },
          (_, i) => i + 1
        ).map((numero) => (
          <div
            key={numero}
            className="label"
          >
              <img
                src="/logo.png"
                alt="Logo"
                className="logo"
              />

              <div className="resort">
                Toscana Sport Resort
              </div>

              <div className="poolbar">
                🍹 POOL BAR
              </div>

              <QRCodeSVG
                value={`${baseUrl}/?ombrellone=${numero}`}
                size={170}
              />

              <div className="scan">
                📱 Scansiona
                per ordinare
              </div>

              <div className="number">
                OMBRELLONE
                {" "}
                {numero}
              </div>
                      ))}
      </div>
    </div>
  );
}

export default QRCodes;
          </div>