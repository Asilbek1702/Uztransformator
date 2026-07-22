import { useState, useEffect, lazy, Suspense } from "react";
import { LanguageProvider } from "./context/LanguageContext";
import { ProductsProvider } from "./context/ProductsContext";
import { ToastProvider } from "./context/ToastContext";
import Intro from "./components/Intro";
import Navigation from "./components/Navigation";
import { supabase } from "./supabaseClient";
import FloatingContacts from "./components/FloatingContacts";
import ErrorBoundary from "./components/ErrorBoundary";
import BackToTop from "./components/BackToTop";
import ScrollProgress from "./components/ScrollProgress";
import Home from "./pages/Home";
import Catalog from "./pages/Catalog";
import About from "./pages/About";
import Contacts from "./pages/Contacts";
import NotFound from "./pages/NotFound";

// Код админки грузится отдельным чанком, только когда реально открыли /admin —
// обычные посетители сайта его не скачивают.
const AdminLogin = lazy(() => import("./pages/AdminLogin"));
const AdminPanel = lazy(() => import("./pages/AdminPanel"));

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
      <ScrollProgress />
      <Navigation page={page} setPage={setPage} />
      <FloatingContacts page={page} setPage={setPage} />
      {page === "home" && <Home setPage={setPage} />}
      {page === "catalog" && <Catalog />}
      {page === "about" && <About />}
      {page === "contacts" && <Contacts />}
      <BackToTop />
    </>
  );
}

function Admin() {
  const [authed, setAuthed] = useState(null); // null = проверяем сессию

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setAuthed(!!data.session));
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setAuthed(!!session);
    });
    return () => listener.subscription.unsubscribe();
  }, []);

  if (authed === null) return null;
  if (!authed) return (
    <Suspense fallback={null}>
      <AdminLogin onSuccess={() => setAuthed(true)} />
    </Suspense>
  );
  return (
    <Suspense fallback={null}>
      <AdminPanel
        onLogout={async () => {
          await supabase.auth.signOut();
          setAuthed(false);
        }}
      />
    </Suspense>
  );
}

// Реальных клиентских роутов в приложении нет (переключение страниц — через state),
// поэтому распознаём только "/" и "/admin". Всё остальное — 404.
function resolveRoute(pathname) {
  if (pathname === "/admin" || pathname.startsWith("/admin/")) return "admin";
  if (pathname === "/" || pathname === "") return "site";
  return "notfound";
}

export default function App() {
  const [route, setRoute] = useState("site");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setRoute(resolveRoute(window.location.pathname));
    }
  }, []);

  return (
    <ErrorBoundary>
      <LanguageProvider>
        <ToastProvider>
          <ProductsProvider>
            <div style={{ fontFamily: "system-ui, sans-serif" }}>
              <style>{`
                html, body { margin: 0; padding: 0; overflow-x: hidden; }
                #root { overflow-x: hidden; }
                *:focus-visible {
                  outline: 2px solid #4f8fe0;
                  outline-offset: 2px;
                }
              `}</style>
              {route === "admin" && <Admin />}
              {route === "site" && <Site />}
              {route === "notfound" && <NotFound />}
            </div>
          </ProductsProvider>
        </ToastProvider>
      </LanguageProvider>
    </ErrorBoundary>
  );
}
