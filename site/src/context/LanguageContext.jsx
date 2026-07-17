import { createContext, useContext, useState } from "react";
import { translations } from "../i18n/translations";

const LanguageContext = createContext(null);

function getPath(obj, path) {
  return path.split(".").reduce((acc, k) => (acc ? acc[k] : undefined), obj);
}

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(localStorage.getItem("uztrans_lang") || "ru");

  function changeLang(l) {
    setLang(l);
    localStorage.setItem("uztrans_lang", l);
  }

  function t(path) {
    const val = getPath(translations[lang], path);
    return val === undefined ? path : val;
  }

  return (
    <LanguageContext.Provider value={{ lang, setLang: changeLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
