import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Customer/Home";
import Dashboard from "./pages/Admin/Dashboard";
import Products from "./pages/Admin/Products";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/admin" element={<Dashboard />} />

        <Route
          path="/admin/products"
          element={<Products />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;