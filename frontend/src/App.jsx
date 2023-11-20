import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import Admin from "./Admin";
import BallotPage from "./user/BallotPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/admin/*' element={<Admin />} />
        <Route path='/user' element={<BallotPage />} />
      </Routes>
    </Router>
  );
}

export default App;