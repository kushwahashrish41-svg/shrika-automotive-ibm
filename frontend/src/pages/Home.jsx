import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import api from "../api/axios";
import ProductCard from "../components/ProductCard";

const CATEGORIES = [
  "All",
  "Cars",
  "Engine Parts",
  "Exterior",
  "Interior",
  "Wheels & Tyres",
];

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState("All");

  const [searchParams] = useSearchParams();
  const search = searchParams.get("search") || "";

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);

      try {
        const params = {};

        if (category !== "All") {
          params.category = category;
        }

        if (search) {
          params.search = search;
        }

        const { data } = await api.get("/products", { params });

        setProducts(data);
      } catch (err) {
        console.error("Failed to fetch products:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category, search]);

  return (
    <main className="min-h-screen">

      {/* HERO SECTION */}
      <section className="max-w-6xl mx-auto px-6 pt-16 pb-12">

        <div className="max-w-3xl">

          <p className="text-sm uppercase tracking-[0.25em] text-accent font-semibold mb-4">
            SHRIKA AUTOMOTIVE
          </p>

          <h1 className="font-display text-4xl md:text-6xl font-700 leading-tight">
            Drive better.
            <br />
            <span className="text-accent">
              Choose Shrika.
            </span>
          </h1>

          <p className="text-muted mt-5 max-w-xl text-base md:text-lg">
            Premium cars, genuine automotive parts and accessories —
            everything you need for your perfect drive.
          </p>

        </div>

      </section>


      {/* CATEGORY SECTION */}
      <section className="max-w-6xl mx-auto px-6 mb-10">

        <div className="flex gap-2 flex-wrap">

          {CATEGORIES.map((cat) => (

            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-5 py-2 rounded-full text-sm border transition-all ${
                category === cat
                  ? "bg-ink text-white border-ink"
                  : "bg-white border-ink/10 hover:border-ink/30"
              }`}
            >
              {cat}
            </button>

          ))}

        </div>

      </section>


      {/* PRODUCTS */}
      <section className="max-w-6xl mx-auto px-6 pb-20">

        {loading ? (

          <div className="text-center py-20">
            <p className="text-muted">
              Loading vehicles & parts...
            </p>
          </div>

        ) : products.length === 0 ? (

          <div className="text-center py-20">

            <p className="text-muted">
              No products found.
            </p>

            <p className="text-sm text-muted mt-2">
              Try another category or search.
            </p>

          </div>

        ) : (

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">

            {products.map((product) => (

              <ProductCard
                key={product._id}
                product={product}
              />

            ))}

          </div>

        )}

      </section>

    </main>
  );
}