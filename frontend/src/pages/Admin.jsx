import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function Admin() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Cars");
  const [image, setImage] = useState("");
  const [stock, setStock] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // Redirect only after component renders
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  // User not loaded yet
  if (!user) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p className="text-muted">Checking admin access...</p>
      </main>
    );
  }

  // User is logged in but not admin
  if (user.role !== "admin") {
    return (
      <main className="max-w-3xl mx-auto px-6 py-20 text-center">
        <h1 className="font-display text-2xl font-bold">
          Access Denied
        </h1>

        <p className="text-muted mt-2">
          Admin access is required.
        </p>
      </main>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setMessage("");

    try {
      await api.post("/products", {
        name,
        description,
        price: Number(price),
        category,
        image,
        stock: Number(stock),
      });

      setMessage("Product added successfully!");

      setName("");
      setDescription("");
      setPrice("");
      setCategory("Cars");
      setImage("");
      setStock("");
    } catch (error) {
      setMessage(
        error.response?.data?.message || "Could not add product"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="max-w-3xl mx-auto px-6 py-14">

      <h1 className="font-display text-3xl font-bold mb-2">
        SHRIKA Admin
      </h1>

      <p className="text-muted mb-8">
        Add a new car or automotive product.
      </p>

      <form
        onSubmit={handleSubmit}
        className="bg-white border border-ink/10 rounded-2xl p-6 flex flex-col gap-4"
      >

        <input
          type="text"
          placeholder="Product name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="px-4 py-3 rounded-lg border border-ink/15"
        />

        <textarea
          placeholder="Product description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          rows="4"
          className="px-4 py-3 rounded-lg border border-ink/15"
        />

        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
          min="0"
          className="px-4 py-3 rounded-lg border border-ink/15"
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="px-4 py-3 rounded-lg border border-ink/15"
        >
          <option>Cars</option>
          <option>Engine Parts</option>
          <option>Exterior</option>
          <option>Interior</option>
          <option>Wheels & Tyres</option>
        </select>

        <input
          type="url"
          placeholder="Product image URL"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          className="px-4 py-3 rounded-lg border border-ink/15"
        />

        <input
          type="number"
          placeholder="Stock"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
          required
          min="0"
          className="px-4 py-3 rounded-lg border border-ink/15"
        />

        {message && (
          <p className="text-sm text-accent">
            {message}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="py-3 rounded-full bg-ink text-white hover:bg-accent transition-colors disabled:opacity-50"
        >
          {loading ? "Adding..." : "Add Product"}
        </button>

      </form>
    </main>
  );
}