import { useState, useEffect } from "react";
import { LanguageProvider } from "./context/LanguageContext";
import { ProductsProvider } from "./context/ProductsContext";
import Intro from "./components/Intro";
import Navigation from "./components/Navigation";
import { supabase } from "./supabaseClient";
import FloatingContacts from "./components/FloatingContacts";
import Home from "./pages/Home";
import Catalog from "./pages/Catalog";
import About from "./pages/About";
import Contacts from "./pages/Contacts";
import AdminLogin from "./pages/AdminLogin";
import AdminPanel from "./pages/AdminPanel";

function Site() {
  const [intro, setIntro] = useState(true);
  const [page, setPage] = useState(() => {
    return localStorage.getItem("current_page") || "home";
  });
  useEffect(() => {
    localStorage.setItem("current_page", page);
  }, [page]);

  return (
    <>
      {intro && <Intro onDone={() => setIntro(false)} />}
      <Navigation page={page} setPage={setPage} />
      <FloatingContacts page={page} setPage={setPage} />
      {page === "home" && <Home setPage={setPage} />}
      {page === "catalog" && <Catalog />}
      {page === "about" && <About />}
      {page === "contacts" && <Contacts />}
    </>
  );
}

function Admin() {
  const [authed, setAuthed] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setAuthed(!!localStorage.getItem("uztrans_token"));
    }
  }, []);

  if (!authed) return <AdminLogin onSuccess={() => setAuthed(true)} />;
  return (
    <AdminPanel
      onLogout={() => {
        localStorage.removeItem("uztrans_token");
        setAuthed(false);
      }}
    />
  );
}

export default function App() {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsAdmin(window.location.pathname.startsWith("/admin"));
    }

    const checkSupabase = async () => {
      // Замените 'products' на имя вашей таблицы, когда создадите её в Supabase
      const { data, error } = await supabase.from("products").select("*").limit(1);
      if (error) {
        console.error("Supabase connection error:", error.message);
      } else {
        console.log("Supabase connected successfully! Test data:", data);
      }
    };
    
    checkSupabase();
  }, []);

  return (
    <LanguageProvider>
      <ProductsProvider>
        <div style={{ fontFamily: "system-ui, sans-serif" }}>
          <style>{`
            html, body { margin: 0; padding: 0; overflow-x: hidden; }
            #root { overflow-x: hidden; }
          `}</style>
          {isAdmin ? <Admin /> : <Site />}
        </div>
      </ProductsProvider>
    </LanguageProvider>
  );
}
