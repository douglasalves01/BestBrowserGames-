import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./views/Login";
import Register from "./views/Register";
import CadastroCategoria from "./views/CadastroCategoria";
import CadastroGame from "./views/CadastroGame";
import Home from "./views/Home";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/cadastro/game" element={<CadastroGame />} />
        <Route path="/cadastro/categoria" element={<CadastroCategoria />} />
      </Routes>
    </Router>
  );
}

export default App;
