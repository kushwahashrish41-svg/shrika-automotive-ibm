import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();

  return (
    <div className="group bg-white rounded-2xl border border-ink/10 overflow-hidden flex flex-col">
      <Link to={`/products/${product._id}`} className="block aspect-square bg-accent-light overflow-hidden">
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted text-sm">
            No image
          </div>
        )}
      </Link>
      <div className="p-4 flex flex-col gap-1 flex-1">
        <span className="text-xs uppercase tracking-wide text-muted">{product.category}</span>
        <Link to={`/products/${product._id}`} className="font-medium leading-snug">
          {product.name}
        </Link>
        <div className="mt-auto flex items-center justify-between pt-3">
          <span className="font-display font-600">₹{product.price}</span>
          <button
            onClick={() => addToCart(product)}
            className="text-sm px-3 py-1.5 rounded-full bg-ink text-white hover:bg-accent transition-colors"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
}
