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
function App() {
  const [token, setToken] = useState("");

  useEffect(() => {
    // Obter o token de autenticação do localStorage
    const authToken = localStorage.getItem("token");
    setToken(authToken);
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/cadastro/game" element={<CadastroGame token={token} />} />
        <Route
          path="/cadastro/categoria"
          element={<CadastroCategoria token={token} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
