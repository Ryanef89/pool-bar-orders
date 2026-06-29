import "./Home.css";

function Home() {
  return (
    <div className="home">

      <header className="header">
        <h1>🏖 Toscana Sport Resort</h1>
        <p>Pool Bar</p>
      </header>

      <div className="tableBox">
        <label>Numero Ombrellone</label>

        <input
          type="number"
          min="1"
          max="30"
          placeholder="Es. 12"
        />
      </div>

      <h2>Categorie</h2>

      <div className="categories">

        <button>🥤 Bibite</button>

        <button>🍺 Birre</button>

        <button>🍹 Cocktail</button>

        <button>🍕 Snack</button>

        <button>☕ Caffetteria</button>

        <button>🍦 Gelati</button>

      </div>

      <button className="startButton">
        Inizia Ordine
      </button>

    </div>
  );
}

export default Home;