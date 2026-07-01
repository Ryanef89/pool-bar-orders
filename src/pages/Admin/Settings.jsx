function Settings() {
  return (
    <div
      style={{
        padding: 30,
        maxWidth: 700,
        margin: "0 auto",
      }}
    >
      <h1>⚙️ Impostazioni</h1>

      <p>
        Questa sezione conterrà tutte le impostazioni del
        Pool Bar.
      </p>

      <div
        style={{
          background: "#fff",
          padding: 25,
          borderRadius: 15,
          marginTop: 25,
          boxShadow: "0 5px 15px rgba(0,0,0,.08)",
        }}
      >
        <h2>🏖 Resort</h2>

        <input
          placeholder="Nome Resort"
          style={{
            width: "100%",
            padding: 12,
            marginTop: 15,
            marginBottom: 15,
          }}
        />

        <input
          placeholder="Nome Bar"
          style={{
            width: "100%",
            padding: 12,
            marginBottom: 15,
          }}
        />

        <input
          placeholder="Telefono / WhatsApp"
          style={{
            width: "100%",
            padding: 12,
            marginBottom: 15,
          }}
        />

        <button>
          Salva impostazioni
        </button>
      </div>
    </div>
  );
}

export default Settings;