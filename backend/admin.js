import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function Admin() {
  const { user } = useAuth();
  const navigate = useNavigate();

  // Product states
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Cars");
  const [image, setImage] = useState("");
  const [stock, setStock] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // Orders states
  const [orders, setOrders] = useState([]);
  const [ordersLoading, setOrdersLoading] = useState(true);
  const [ordersError, setOrdersError] = useState("");

  // Admin authentication
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  // Fetch all orders
  useEffect(() => {
    const fetchOrders = async () => {
      if (!user || user.role !== "admin") return;

      try {
        setOrdersLoading(true);
        setOrdersError("");

        const response = await api.get("/orders");
        setOrders(response.data);
      } catch (error) {
        console.error("Orders fetch error:", error);
        setOrdersError(
          error.response?.data?.message || "Could not load orders"
        );
      } finally {
        setOrdersLoading(false);
      }
    };

    fetchOrders();
  }, [user]);

  // User not loaded
  if (!user) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p className="text-muted">Checking admin access...</p>
      </main>
    );
  }

  // Not admin
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

  // Add Product
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

  const totalOrders = orders.length;

  const pendingOrders = orders.filter(
    (order) => order.status === "pending"
  ).length;

  const totalSales = orders.reduce(
    (sum, order) => sum + Number(order.totalAmount || 0),
    0
  );

  return (
    <main className="max-w-6xl mx-auto px-6 py-14">

      {/* ADMIN HEADER */}
      <div className="mb-10">
        <h1 className="font-display text-3xl font-bold">
          SHRIKA Admin
        </h1>

        <p className="text-muted mt-2">
          Manage products and monitor customer orders.
        </p>
      </div>

      {/* ORDER SUMMARY */}
      <section className="grid md:grid-cols-3 gap-4 mb-10">

        <div className="bg-white border border-ink/10 rounded-2xl p-6">
          <p className="text-muted text-sm">
            Total Orders
          </p>

          <p className="text-3xl font-bold mt-2">
            {totalOrders}
          </p>
        </div>

        <div className="bg-white border border-ink/10 rounded-2xl p-6">
          <p className="text-muted text-sm">
            Pending Orders
          </p>

          <p className="text-3xl font-bold mt-2">
            {pendingOrders}
          </p>
        </div>

        <div className="bg-white border border-ink/10 rounded-2xl p-6">
          <p className="text-muted text-sm">
            Total Sales
          </p>

          <p className="text-3xl font-bold mt-2">
            ₹{totalSales.toLocaleString("en-IN")}
          </p>
        </div>

      </section>

      {/* ORDERS */}
      <section className="mb-12">

        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="font-display text-2xl font-bold">
              Customer Orders
            </h2>

            <p className="text-muted mt-1">
              View all orders placed by customers.
            </p>
          </div>
        </div>

        {ordersLoading && (
          <div className="bg-white border border-ink/10 rounded-2xl p-8 text-center">
            <p className="text-muted">
              Loading orders...
            </p>
          </div>
        )}

        {ordersError && (
          <div className="bg-white border border-red-200 rounded-2xl p-6">
            <p className="text-red-600">
              {ordersError}
            </p>
          </div>
        )}

        {!ordersLoading &&
          !ordersError &&
          orders.length === 0 && (
            <div className="bg-white border border-ink/10 rounded-2xl p-8 text-center">
              <p className="text-muted">
                No orders yet.
              </p>
            </div>
          )}

        <div className="flex flex-col gap-5">

          {orders.map((order) => (

            <div
              key={order._id}
              className="bg-white border border-ink/10 rounded-2xl p-6"
            >

              {/* ORDER TOP */}
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-5">

                <div>
                  <p className="font-bold">
                    Order #{order._id?.slice(-8)}
                  </p>

                  <p className="text-sm text-muted mt-1">
                    {new Date(order.createdAt).toLocaleString(
                      "en-IN"
                    )}
                  </p>
                </div>

                <span className="px-4 py-2 rounded-full bg-yellow-100 text-yellow-700 text-sm font-semibold w-fit">
                  {order.status?.toUpperCase()}
                </span>

              </div>

              {/* CUSTOMER DETAILS */}
              <div className="grid md:grid-cols-2 gap-4 mb-5">

                <div>
                  <p className="text-sm text-muted">
                    Customer
                  </p>

                  <p className="font-semibold">
                    {order.customerName ||
                      order.user?.name ||
                      "N/A"}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-muted">
                    Email
                  </p>

                  <p className="font-semibold">
                    {order.customerEmail ||
                      order.user?.email ||
                      "N/A"}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-muted">
                    Phone
                  </p>

                  <p className="font-semibold">
                    {order.phone || "N/A"}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-muted">
                    Address
                  </p>

                  <p className="font-semibold">
                    {order.address || "N/A"}
                  </p>
                </div>

              </div>

              {/* PRODUCTS */}
              <div className="border-t border-ink/10 pt-5">

                <p className="font-semibold mb-3">
                  Ordered Products
                </p>

                <div className="flex flex-col gap-3">

                  {order.items?.map((item, index) => (

                    <div
                      key={item._id || index}
                      className="flex justify-between items-center bg-gray-50 rounded-xl p-4"
                    >

                      <div>
                        <p className="font-semibold">
                          {item.name ||
                            item.product?.name ||
                            item.title ||
                            "Product"}
                        </p>

                        <p className="text-sm text-muted">
                          Quantity: {item.quantity || 1}
                        </p>
                      </div>

                      <p className="font-semibold">
                        ₹
                        {Number(
                          item.price ||
                            item.product?.price ||
                            0
                        ).toLocaleString("en-IN")}
                      </p>

                    </div>

                  ))}

                </div>

              </div>

              {/* TOTAL */}
              <div className="border-t border-ink/10 mt-5 pt-5 flex justify-between items-center">

                <span className="font-semibold">
                  Order Total
                </span>

                <span className="text-xl font-bold">
                  ₹
                  {Number(
                    order.totalAmount || 0
                  ).toLocaleString("en-IN")}
                </span>

              </div>

            </div>

          ))}

        </div>

      </section>

      {/* ADD PRODUCT */}
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