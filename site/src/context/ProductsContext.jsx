import { createContext, useContext, useEffect, useState } from "react";
import { API_BASE_URL } from "../config";

const ProductsContext = createContext(null);

export function ProductsProvider({ children }) {
  const [products, setProducts] = useState([]);

  async function refresh() {
    const res = await fetch(`${API_BASE_URL}/products/`);
    const data = await res.json();
    setProducts(data);
  }

  useEffect(() => { refresh(); }, []);

  function authHeaders() {
    const token = localStorage.getItem("uztrans_token");
    return { "Content-Type": "application/json", Authorization: `Bearer ${token}` };
  }

  async function addProduct(p) {
    await fetch(`${API_BASE_URL}/products/`, {
      method: "POST", headers: authHeaders(), body: JSON.stringify(p),
    });
    await refresh();
  }

  async function updateProduct(id, p) {
    await fetch(`${API_BASE_URL}/products/${id}`, {
      method: "PUT", headers: authHeaders(), body: JSON.stringify(p),
    });
    await refresh();
  }

  async function deleteProduct(id) {
    await fetch(`${API_BASE_URL}/products/${id}`, {
      method: "DELETE", headers: authHeaders(),
    });
    await refresh();
  }

  return (
    <ProductsContext.Provider value={{ products, addProduct, updateProduct, deleteProduct }}>
      {children}
    </ProductsContext.Provider>
  );
}

export function useProducts() {
  return useContext(ProductsContext);
}