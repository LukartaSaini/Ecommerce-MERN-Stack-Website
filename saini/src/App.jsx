import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CartProvider } from "./compontents/ContextReducer";
import Home from "./screens/Home";
import Login from "./screens/Login";
import MyOrder from "./screens/MyOrder";
import Signup from "./screens/Signup";
import Success from "./compontents/Success";
import Cancel from "./compontents/Cancel";


function App() {
  return (
    <CartProvider>
    <Router>
      <div>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/createuser" element={<Signup />} />
          <Route exact path="/myorder" element={<MyOrder />} />
          <Route exact path="/success" element={<Success />} />
          <Route exact path="/cancel" element={<Cancel />} />
          

        </Routes>
      </div>
    </Router>
    </CartProvider>
  );
}

export default App;
