import { useEffect, useState } from "react";
import api from "../api/axios";

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        setError("");

        const { data } = await api.get("/orders");

        console.log("ADMIN ORDERS:", data);

        setOrders(data);
      } catch (error) {
        console.error("Admin orders error:", error);

        setError(
          error.response?.data?.message ||
            "Unable to load orders. Make sure you are logged in as admin."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return (
      <main className="max-w-5xl mx-auto px-6 py-14">
        <p>Loading orders...</p>
      </main>
    );
  }

  return (
    <main className="max-w-5xl mx-auto px-6 py-14">
      <h1 className="font-display text-3xl font-700 mb-8">
        Admin Orders
      </h1>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 rounded-xl p-4 mb-6">
          {error}
        </div>
      )}

      {!error && orders.length === 0 ? (
        <p className="text-muted">No orders yet.</p>
      ) : (
        <div className="flex flex-col gap-5">
          {orders.map((order) => (
            <div
              key={order._id}
              className="bg-white border border-ink/10 rounded-2xl p-6"
            >
              <h2 className="font-display text-xl font-600">
                Customer: {order.user?.name || "Unknown"}
              </h2>

              <p className="text-muted">
                Email: {order.user?.email || "No email"}
              </p>

              {order.phone && (
                <p className="mt-2">
                  <strong>Phone:</strong> {order.phone}
                </p>
              )}

              {order.address && (
                <p className="mt-1">
                  <strong>Address:</strong> {order.address}
                </p>
              )}

              <p className="mt-3">
                <strong>Order Date:</strong>{" "}
                {new Date(order.createdAt).toLocaleString()}
              </p>

              <p className="mt-1">
                <strong>Status:</strong>{" "}
                <span className="px-2 py-1 rounded-full bg-yellow-100 text-yellow-700 text-sm">
                  {order.status}
                </span>
              </p>

              <p className="font-display font-600 mt-3">
                Total: ₹{order.totalAmount}
              </p>

              <div className="mt-4">
                <strong>Products:</strong>

                <ul className="mt-2 text-muted">
                  {order.items?.map((item, index) => (
                    <li key={index}>
                      {item.name} × {item.quantity} — ₹{item.price}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}