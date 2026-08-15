import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Orders from "./pages/Orders";
import Admin from "./pages/Admin";
import AdminOrders from "./pages/AdminOrders";

function App() {
  return (
    <div className="min-h-screen bg-paper text-ink">
      <Navbar />

      <Routes>
        {/* Normal pages */}
        <Route path="/" element={<Home />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />

        {/* Authentication */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* User orders */}
        <Route path="/orders" element={<Orders />} />

        {/* Admin */}
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/orders" element={<AdminOrders />} />

        {/* 404 */}
        <Route
          path="*"
          element={
            <main className="max-w-3xl mx-auto px-6 py-20 text-center">
              <h1 className="font-display text-3xl font-700">
                Page Not Found
              </h1>
              <p className="text-muted mt-2">
                The page you are looking for does not exist.
              </p>
            </main>
          }
        />
      </Routes>
    </div>
  );
}

export default App;