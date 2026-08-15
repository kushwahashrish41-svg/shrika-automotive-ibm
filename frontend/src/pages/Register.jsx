import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await register(name, email, password);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="max-w-sm mx-auto px-6 py-20">
      <h1 className="font-display text-2xl font-700 mb-6">Create account</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Full name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="px-4 py-2.5 rounded-lg border border-ink/15 focus:outline-none focus:ring-2 focus:ring-accent"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="px-4 py-2.5 rounded-lg border border-ink/15 focus:outline-none focus:ring-2 focus:ring-accent"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength={6}
          className="px-4 py-2.5 rounded-lg border border-ink/15 focus:outline-none focus:ring-2 focus:ring-accent"
        />
        {error && <p className="text-red-600 text-sm">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="mt-2 py-2.5 rounded-full bg-ink text-white hover:bg-accent transition-colors disabled:opacity-50"
        >
          {loading ? "Creating..." : "Create account"}
        </button>
      </form>
      <p className="text-sm text-muted mt-5">
        Already have an account?{" "}
        <Link to="/login" className="text-accent font-medium">
          Log in
        </Link>
      </p>
    </main>
  );
}
