import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useState, useEffect } from "react";
import Login from "./views/Login";
import Register from "./views/Register";
import CadastroCategoria from "./views/CadastroCategoria";
import CadastroGame from "./views/CadastroGame";
import Home from "./views/Home";
import BestBrowserGames from "./views/BestBrowserGames";
function App() {
  const [token, setToken] = useState("");

  useEffect(() => {
    const authToken = localStorage.getItem("token");
    setToken(authToken);
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/home" element={<Home token={token} />} />
        <Route path="/cadastro/game" element={<CadastroGame token={token} />} />
        <Route
          path="/cadastro/categoria"
          element={<CadastroCategoria token={token} />}
        />
        <Route path="/games" element={<BestBrowserGames token={token} />} />
      </Routes>
    </Router>
  );
}

export default App;
