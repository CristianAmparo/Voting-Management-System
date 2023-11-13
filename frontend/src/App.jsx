import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Login from "./Login"
import Register from "./Register"
import Dashboard from "./Dashboard"
import Sample from "./sample"
import Admin from "./Admin"


function App() {


  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Dashboard/>}/>
          <Route path='/sample' element={<Sample/>}/>
          <Route path='/admin' element={<Admin/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/register' element={<Register/>}/>   
        </Routes>
      </Router>
      
    </>
  )
}

export default App
