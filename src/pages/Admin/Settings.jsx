import { useEffect, useState } from "react";
import AdminHeader from "../../components/admin/AdminHeader";
import {
  getSettings,
  saveSettings,
} from "../../services/settingsService";

function Settings() {
  const [settings, setSettings] = useState({
    resortName: "",
    barName: "",
    ombrelloni: 40,
    qrLayout: 12,
    primaryColor: "#0b8457",
  });

  useEffect(() => {
    loadSettings();
  }, []);

  async function loadSettings() {
    const data = await getSettings();

    if (data) {
      setSettings(data);
    }
  }

  async function save() {
    await saveSettings(settings);
    alert("✅ Impostazioni salvate");
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

      <h1>⚙️ Impostazioni</h1>

      <div
        style={{
          background: "#fff",
          padding: 25,
          borderRadius: 15,
          maxWidth: 700,
        }}
      >
        <input
          placeholder="Nome Resort"
          value={settings.resortName}
          onChange={(e) =>
            setSettings({
              ...settings,
              resortName: e.target.value,
            })
          }
        />

        <br />
        <br />

        <input
          placeholder="Nome Pool Bar"
          value={settings.barName}
          onChange={(e) =>
            setSettings({
              ...settings,
              barName: e.target.value,
            })
          }
        />

        <br />
        <br />

        <input
          type="number"
          placeholder="Numero Ombrelloni"
          value={settings.ombrelloni}
          onChange={(e) =>
            setSettings({
              ...settings,
              ombrelloni: Number(e.target.value),
            })
          }
        />

        <br />
        <br />

        <select
          value={settings.qrLayout}
          onChange={(e) =>
            setSettings({
              ...settings,
              qrLayout: Number(e.target.value),
            })
          }
        >
          <option value={8}>8 QR</option>
          <option value={12}>12 QR</option>
          <option value={16}>16 QR</option>
          <option value={24}>24 QR</option>
        </select>

        <br />
        <br />

        <button onClick={save}>
          💾 Salva
        </button>
      </div>
    </div>
  );
}

export default Settings;