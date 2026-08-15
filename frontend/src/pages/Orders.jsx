import { useEffect, useState } from "react";
import api from "../api/axios";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/orders/my")
      .then(({ data }) => setOrders(data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="max-w-3xl mx-auto px-6 py-14 text-muted">Loading...</p>;

  return (
    <main className="max-w-3xl mx-auto px-6 py-14">
      <h1 className="font-display text-2xl font-700 mb-8">Your Orders</h1>
      {orders.length === 0 ? (
        <p className="text-muted">No orders yet.</p>
      ) : (
        <div className="flex flex-col gap-4">
          {orders.map((order) => (
            <div key={order._id} className="bg-white border border-ink/10 rounded-xl p-5">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-muted">
                  {new Date(order.createdAt).toLocaleDateString()}
                </span>
                <span className="text-xs uppercase tracking-wide px-2 py-1 rounded-full bg-accent-light text-accent">
                  {order.status}
                </span>
              </div>
              <ul className="text-sm text-muted mb-3">
                {order.items.map((item, idx) => (
                  <li key={idx}>
                    {item.name} × {item.quantity}
                  </li>
                ))}
              </ul>
              <p className="font-display font-600">₹{order.totalAmount}</p>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
