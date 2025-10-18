import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Pages/Home.jsx";
import Footer from "./components/Footer.jsx";
import Navbar from "./components/Navbar.jsx";
import Register from "./components/Pages/Register.jsx";
import Login from "./components/Pages/Login.jsx";
import Cart from "./components/Pages/Cart.jsx";
import Pizza from "./components/Pages/Pizza.jsx";
import Profile from "./components/Pages/Profile.jsx";
import NotFound from "./components/Pages/NotFound.jsx";
import { CartProvider } from "./store/CartContext.jsx";
import {UserProvider} from "./store/UserContext.jsx";
import RutaProtegida from "./components/RutaProtegida.jsx";
function App() {
  return (
    <div>
      <CartProvider>
        <UserProvider>
          <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/pizza/:id" element={<Pizza />} />
          <Route path="/profile" element={<RutaProtegida><Profile /></RutaProtegida>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </BrowserRouter>
      </UserProvider>
      </CartProvider>
    </div>
  );
}
export default App;
