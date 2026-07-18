import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../supabaseClient"; // <-- Импортируем ваш клиент Supabase

const ProductsContext = createContext(null);

export function ProductsProvider({ children }) {
  const [products, setProducts] = useState([]);

  // 1. Получение всех товаров (Read)
  async function refresh() {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("id", { ascending: true }); // Сортировка (по желанию)

    if (error) {
      console.error("Ошибка при получении товаров:", error.message);
    } else {
      setProducts(data || []);
    }
  }

  useEffect(() => {
    refresh();
  }, []);

  // 2. Добавление товара (Create)
  async function addProduct(p) {
    const { error } = await supabase
      .from("products")
      .insert([p]);

    if (error) {
      console.error("Ошибка при добавлении товара:", error.message);
    } else {
      await refresh();
    }
  }

  // 3. Обновление товара (Update)
  async function updateProduct(id, p) {
    const { error } = await supabase
      .from("products")
      .update(p)
      .eq("id", id); // Фильтр по ID строки

    if (error) {
      console.error("Ошибка при обновлении товара:", error.message);
    } else {
      await refresh();
    }
  }

  // 4. Удаление товара (Delete)
  async function deleteProduct(id) {
    const { error } = await supabase
      .from("products")
      .delete()
      .eq("id", id); // Фильтр по ID строки

    if (error) {
      console.error("Ошибка при удалении товара:", error.message);
    } else {
      await refresh();
    }
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
