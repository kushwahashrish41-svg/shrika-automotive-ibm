import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function Admin() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [ordersLoading, setOrdersLoading] = useState(true);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Cars");
  const [image, setImage] = useState("");
  const [stock, setStock] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    if (user.role === "admin") {
      fetchOrders();
    }
  }, [user, navigate]);

  const fetchOrders = async () => {
    try {
      setOrdersLoading(true);

      const res = await api.get("/orders");

      setOrders(res.data);
    } catch (error) {
      console.error("Failed to fetch orders:", error);
    } finally {
      setOrdersLoading(false);
    }
  };

  if (!user) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p className="text-muted">Checking admin access...</p>
      </main>
    );
  }

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
    <main className="max-w-6xl mx-auto px-6 py-14">

      {/* ADMIN HEADER */}
      <h1 className="font-display text-3xl font-bold mb-2">
        SHRIKA Admin
      </h1>

      <p className="text-muted mb-10">
        Manage products and orders.
      </p>

      {/* ORDERS SECTION */}
      <section className="mb-12">

        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="font-display text-2xl font-bold">
              Orders
            </h2>

            <p className="text-muted">
              {orders.length} order{orders.length !== 1 ? "s" : ""} received
            </p>
          </div>

          <button
            onClick={fetchOrders}
            className="px-5 py-2 rounded-full bg-ink text-white"
          >
            Refresh
          </button>
        </div>

        {ordersLoading ? (
          <p className="text-muted">
            Loading orders...
          </p>
        ) : orders.length === 0 ? (
          <div className="border rounded-2xl p-6">
            <p className="text-muted">
              No orders yet.
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-4">

            {orders.map((order) => (
              <div
                key={order._id}
                className="bg-white border border-ink/10 rounded-2xl p-6"
              >

                <div className="flex justify-between items-start gap-4">

                  <div>
                    <p className="font-bold">
                      Order #{order._id.slice(-6).toUpperCase()}
                    </p>

                    <p className="text-sm text-muted mt-1">
                      {new Date(order.createdAt).toLocaleString()}
                    </p>
                  </div>

                  <span className="px-3 py-1 rounded-full bg-yellow-100 text-yellow-700 text-sm">
                    {order.status?.toUpperCase()}
                  </span>

                </div>

                <div className="mt-5 grid md:grid-cols-2 gap-4">

                  <div>
                    <p className="font-semibold">
                      Customer
                    </p>

                    <p>{order.customerName}</p>
                    <p className="text-sm text-muted">
                      {order.customerEmail}
                    </p>
                    <p className="text-sm text-muted">
                      {order.phone}
                    </p>
                  </div>

                  <div>
                    <p className="font-semibold">
                      Address
                    </p>

                    <p className="text-sm text-muted">
                      {order.address}
                    </p>
                  </div>

                </div>

                <div className="mt-5">

                  <p className="font-semibold mb-2">
                    Items
                  </p>

                  {order.items?.map((item, index) => (
                    <div
                      key={index}
                      className="flex justify-between border-b py-2 text-sm"
                    >
                      <span>
                        {item.name || item.product?.name}
                        {" × "}
                        {item.quantity}
                      </span>

                      <span>
                        ₹{item.price}
                      </span>
                    </div>
                  ))}

                </div>

                <div className="mt-5 pt-4 border-t flex justify-between font-bold">
                  <span>Total</span>

                  <span>
                    ₹{Number(order.totalAmount).toLocaleString("en-IN")}
                  </span>
                </div>

              </div>
            ))}

          </div>
        )}

      </section>

      {/* ADD PRODUCT SECTION */}
      <section>

        <h2 className="font-display text-2xl font-bold mb-2">
          Add Product
        </h2>

        <p className="text-muted mb-6">
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

      </section>

    </main>
  );
}