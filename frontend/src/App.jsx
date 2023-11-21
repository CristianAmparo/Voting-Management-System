import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import Admin from "./Admin";
import User from "./User";

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/admin/*' element={<Admin />} />
        <Route path='/user/*' element={<User />} />
      </Routes>
    </Router>
  );
}

export default App;