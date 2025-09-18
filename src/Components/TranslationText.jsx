import { useSelector } from "react-redux";
import getTranslationText from "../Utils/getTranslationText";

export default function TranslationText({ page, title}) {
  // Current language logic
  const currentLanguage = useSelector((state) => state.lang);
  const translatedText = getTranslationText({ page, title,  lang: currentLanguage });
  return translatedText;
}
