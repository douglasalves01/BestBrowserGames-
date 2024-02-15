import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./views/Login";
import Dahsboard from "./views/Dashboard";
import Register from "./views/Register";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dahsboard />} />
      </Routes>
    </Router>
  );
}

export default App;
