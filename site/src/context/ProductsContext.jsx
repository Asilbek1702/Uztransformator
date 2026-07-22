import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

const ProductsContext = createContext(null);

export function ProductsProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  async function refresh() {
    setLoading(true);
    setError(null);
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("id", { ascending: true });

    if (error) {
      console.error("Ошибка при получении товаров:", error.message);
      setError(error.message);
    } else {
      setProducts(data || []);
    }
    setLoading(false);
  }

  useEffect(() => {
    refresh();
  }, []);

  async function addProduct(p) {
    const { error } = await supabase.from("products").insert([p]);
    if (error) {
      console.error("Ошибка при добавлении товара:", error.message);
      throw error;
    }
    await refresh();
  }

  async function updateProduct(id, p) {
    const { error } = await supabase.from("products").update(p).eq("id", id);
    if (error) {
      console.error("Ошибка при обновлении товара:", error.message);
      throw error;
    }
    await refresh();
  }

  async function deleteProduct(id) {
    const { error } = await supabase.from("products").delete().eq("id", id);
    if (error) {
      console.error("Ошибка при удалении товара:", error.message);
      throw error;
    }
    await refresh();
  }

  return (
    <ProductsContext.Provider value={{ products, loading, error, addProduct, updateProduct, deleteProduct, refresh }}>
      {children}
    </ProductsContext.Provider>
  );
}

export function useProducts() {
  return useContext(ProductsContext);
}