import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";
import { useCart } from "../context/CartContext";

export default function ProductDetail() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");

  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await api.get(`/products/${id}`);

        setProduct(data);

        setSelectedImage(
          data.images?.length > 0 ? data.images[0] : data.image
        );
      } catch (error) {
        console.error("Failed to load product:", error);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) {
    return (
      <p className="max-w-6xl mx-auto px-6 py-14 text-muted">
        Loading...
      </p>
    );
  }

  const images =
    product.images?.length > 0
      ? product.images
      : product.image
        ? [product.image]
        : [];

  return (
    <main className="max-w-6xl mx-auto px-6 py-10 md:py-14">

      <div className="grid md:grid-cols-2 gap-10">

        {/* IMAGE GALLERY */}
        <div>

          <div className="aspect-square bg-accent-light rounded-2xl overflow-hidden">
            {selectedImage ? (
              <img
                src={selectedImage}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-muted">
                No image
              </div>
            )}
          </div>

          {/* THUMBNAILS */}
          {images.length > 1 && (
            <div className="grid grid-cols-5 gap-3 mt-4">

              {images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(image)}
                  className={`aspect-square rounded-xl overflow-hidden border-2 transition ${
                    selectedImage === image
                      ? "border-ink"
                      : "border-transparent"
                  }`}
                >
                  <img
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}

            </div>
          )}

        </div>

        {/* PRODUCT INFORMATION */}
        <div className="flex flex-col justify-center">

          <span className="text-xs uppercase tracking-[0.2em] text-muted">
            {product.category}
          </span>

          <h1 className="font-display text-3xl md:text-4xl font-700 mt-2">
            {product.name}
          </h1>

          <p className="font-display text-2xl md:text-3xl mt-5">
            ₹{product.price.toLocaleString("en-IN")}
          </p>

          <p className="text-muted mt-5 leading-relaxed">
            {product.description}
          </p>

          <p className="text-sm mt-5 text-muted">
            {product.stock > 0
              ? `${product.stock} in stock`
              : "Out of stock"}
          </p>

          <button
            onClick={() => addToCart(product)}
            disabled={product.stock === 0}
            className="mt-7 w-full md:w-fit px-8 py-3 rounded-full bg-ink text-white hover:bg-accent transition-colors disabled:opacity-40"
          >
            Add to cart
          </button>

        </div>

      </div>

    </main>
  );
}