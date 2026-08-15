import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const { cartCount } = useCart();

  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();

    if (query.trim()) {
      navigate(`/?search=${encodeURIComponent(query.trim())}`);
    } else {
      navigate("/");
    }
  };

  return (
    <header className="sticky top-0 z-20 bg-paper/90 backdrop-blur border-b border-ink/10">
      <div className="max-w-6xl mx-auto flex items-center gap-6 px-6 py-4">

        {/* Website Logo / Name */}
        <Link
          to="/"
          className="font-display text-xl font-700 tracking-tight"
        >
          SHRIKA<span className="text-accent">.</span>
        </Link>

        {/* Search Bar */}
        <form
          onSubmit={handleSearch}
          className="flex-1 max-w-md"
        >
          <input
            type="text"
            placeholder="Search products..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full px-4 py-2 rounded-full bg-white border border-ink/10 text-sm focus:outline-none focus:ring-2 focus:ring-accent"
          />
        </form>

        {/* Navigation */}
        <nav className="flex items-center gap-5 text-sm font-medium ml-auto">

          {/* Cart */}
          <Link
            to="/cart"
            className="relative"
          >
            Cart

            {cartCount > 0 && (
              <span className="absolute -top-2 -right-3 bg-accent text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>

          {/* Logged-in User */}
          {user ? (
            <>
              <Link to="/orders">
                Orders
              </Link>

              <button
                onClick={logout}
                className="text-muted hover:text-ink"
              >
                Logout ({user.name.split(" ")[0]})
              </button>
            </>
          ) : (
            <Link to="/login">
              Login
            </Link>
          )}

        </nav>
      </div>
    </header>
  );
}
