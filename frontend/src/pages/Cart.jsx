import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import api from "../api/axios";
import { useState } from "react";

export default function Cart() {
  const {
    cart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
    cartTotal,
  } = useCart();

  const { user } = useAuth();
  const navigate = useNavigate();

  const [placing, setPlacing] = useState(false);
  const [error, setError] = useState("");

  // Delivery details
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const handleCheckout = async () => {
    if (!user) {
      navigate("/login");
      return;
    }

    // Check phone
    if (!phone.trim()) {
      setError("Please enter your phone number");
      return;
    }

    // Check address
    if (!address.trim()) {
      setError("Please enter your delivery address");
      return;
    }

    if (phone.length < 10) {
      setError("Please enter a valid phone number");
      return;
    }

    setPlacing(true);
    setError("");

    try {
      const items = cart.map((item) => ({
        product: item._id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
      }));

      await api.post("/orders", {
        items,
        totalAmount: cartTotal,
        phone,
        address,
      });

      clearCart();
      navigate("/orders");

    } catch (err) {
      console.error("Order error:", err);

      setError(
        err.response?.data?.message || "Could not place order"
      );
    } finally {
      setPlacing(false);
    }
  };

  /* Empty Cart */

  if (cart.length === 0) {
    return (
      <main className="max-w-3xl mx-auto px-6 py-20 text-center">
        <div className="bg-white border border-ink/10 rounded-2xl p-10">

          <div className="text-5xl mb-4">
            🛒
          </div>

          <h1 className="font-display text-2xl font-700 mb-2">
            Your cart is empty
          </h1>

          <p className="text-muted mb-6">
            Looks like you haven't added anything yet.
          </p>

          <button
            onClick={() => navigate("/")}
            className="px-6 py-3 rounded-full bg-ink text-white hover:bg-accent transition-colors"
          >
            Continue Shopping
          </button>

        </div>
      </main>
    );
  }

  return (
    <main className="max-w-4xl mx-auto px-6 py-14">

      {/* Heading */}

      <div className="flex items-center justify-between mb-8">

        <div>
          <h1 className="font-display text-3xl font-700">
            Your Cart
          </h1>

          <p className="text-muted text-sm mt-1">
            {cart.reduce(
              (total, item) => total + item.quantity,
              0
            )}{" "}
            item(s) in your cart
          </p>
        </div>

        <button
          onClick={clearCart}
          className="text-sm text-muted hover:text-red-600 transition-colors"
        >
          Clear Cart
        </button>

      </div>


      {/* Cart Items */}

      <div className="flex flex-col gap-4">

        {cart.map((item) => (

          <div
            key={item._id}
            className="flex items-center gap-4 bg-white border border-ink/10 rounded-2xl p-4"
          >

            {/* Product Image */}

            <div className="w-20 h-20 bg-accent-light rounded-xl overflow-hidden shrink-0">

              {item.image ? (
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-muted text-xs">
                  No image
                </div>
              )}

            </div>


            {/* Product Information */}

            <div className="flex-1 min-w-0">

              <p className="font-medium truncate">
                {item.name}
              </p>

              <p className="text-sm text-muted mt-1">
                ₹{item.price}
              </p>

              <p className="text-xs text-muted mt-1">
                Subtotal: ₹{item.price * item.quantity}
              </p>

            </div>


            {/* Quantity */}

            <div className="flex items-center gap-2">

              <button
                onClick={() => decreaseQuantity(item._id)}
                className="w-8 h-8 rounded-full border border-ink/20 hover:bg-ink/5"
              >
                −
              </button>

              <span className="w-8 text-center font-medium">
                {item.quantity}
              </span>

              <button
                onClick={() => increaseQuantity(item._id)}
                className="w-8 h-8 rounded-full border border-ink/20 hover:bg-ink/5"
              >
                +
              </button>

            </div>


            {/* Remove */}

            <button
              onClick={() => removeFromCart(item._id)}
              className="text-sm text-muted hover:text-red-600 transition-colors ml-2"
            >
              Remove
            </button>

          </div>

        ))}

      </div>


      {/* Order Summary */}

      <div className="mt-10 bg-white border border-ink/10 rounded-2xl p-6">

        <h2 className="font-display text-xl font-700 mb-5">
          Delivery Details
        </h2>


        {/* Phone */}

        <div className="mb-4">

          <label className="block text-sm font-medium mb-2">
            Phone Number
          </label>

          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Enter your phone number"
            maxLength="10"
            className="w-full px-4 py-3 rounded-xl border border-ink/20 outline-none focus:border-ink"
          />

        </div>


        {/* Address */}

        <div className="mb-6">

          <label className="block text-sm font-medium mb-2">
            Delivery Address
          </label>

          <textarea
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Enter your complete delivery address"
            rows="4"
            className="w-full px-4 py-3 rounded-xl border border-ink/20 outline-none focus:border-ink resize-none"
          />

        </div>


        {/* Subtotal */}

        <div className="flex items-center justify-between">

          <span className="text-muted">
            Subtotal
          </span>

          <span className="font-medium">
            ₹{cartTotal}
          </span>

        </div>


        {/* Delivery */}

        <div className="flex items-center justify-between mt-3">

          <span className="text-muted">
            Delivery
          </span>

          <span className="text-sm">
            Free
          </span>

        </div>


        {/* Total */}

        <div className="border-t border-ink/10 mt-5 pt-5 flex items-center justify-between">

          <span className="font-medium">
            Total
          </span>

          <span className="font-display text-2xl font-700">
            ₹{cartTotal}
          </span>

        </div>


        {/* Error */}

        {error && (
          <p className="text-red-600 text-sm mt-4">
            {error}
          </p>
        )}


        {/* Checkout */}

        <button
          onClick={handleCheckout}
          disabled={placing}
          className="mt-6 w-full py-3 rounded-full bg-ink text-white hover:bg-accent transition-colors disabled:opacity-50"
        >
          {placing
            ? "Placing order..."
            : user
            ? "Place Order"
            : "Login to Checkout"}
        </button>

      </div>

    </main>
  );
}