import { useDispatch, useSelector } from "react-redux";
import { setLanguage } from "../Store/slices/langSlice";
import { useLayoutEffect } from "react";

export function useLanguage() {
  const dispatch = useDispatch();
  const currentLang = useSelector((state) => state.language);

  useLayoutEffect(() => {
    const savedLang = localStorage.getItem("lang");

    if (savedLang) {
      dispatch(setLanguage(savedLang));
    } else {
      const browserLanguage = (navigator.language || "en").split("-")[0];
      const language = browserLanguage.startsWith("ar") ? "ar" : "en";
      dispatch(setLanguage(language));
      localStorage.setItem("lang", language);
    }
  }, []);

  return currentLang;
}
