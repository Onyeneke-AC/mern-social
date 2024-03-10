import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Profile from "./pages/profile/Profile";
import Register from "./pages/register/Register";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" Component={Home} />
        <Route path="/login" Component={Login} />
        <Route path="/register" Component={Register} />
        <Route path="/profile/:username" Component={Profile} />
      </Routes>
    </Router>
  );
}

export default App;
