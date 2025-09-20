import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  IconLanguage,
  IconMoonSvg,
  IconSunSvg,
} from "../Assets/Icons/IconsSvg";
import { toggleDarkMode } from "../Store/slices/themeSlice";
import DropdownActions from "./DropdownActions";
import { setLanguage } from "../Store/slices/langSlice";
import { Bell, Plus, Search, Star } from "lucide-react";

export default function MainActionsTheme() {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.themeSlice.theme);
  const currentLanguage = useSelector((state) => state.lang);

  const handleThemeToggle = () => {
    const newTheme = theme == "light" ? "dark" : "light";
    dispatch(toggleDarkMode(newTheme));
  };
  const LanguageAction = [
    {
      label: "english",
      onClick: () => {
        dispatch(setLanguage("en"));
        window.location.reload();
      },
      isActive: currentLanguage == "en",
    },
    {
      label: "arabic",
      onClick: () => {
        dispatch(setLanguage("ar"));
        window.location.reload();
      },
      isActive: currentLanguage == "ar",
    },
  ];
  return (
    <>
      <button onClick={() => handleThemeToggle()} className="btn_actions">
        <Search />
      </button>
      <button onClick={() => handleThemeToggle()} className="btn_actions">
        <Plus />
      </button>
      <button onClick={() => handleThemeToggle()} className="btn_actions">
        {theme == "dark" ? <IconSunSvg /> : <IconMoonSvg />}
      </button>
      <DropdownActions
        title={currentLanguage == "en" ? "english" : "arabic"}
        className="btn_icon btn_actions"
        isActiveClassName="btn_icon_Active"
        icon={<IconLanguage />}
        isDropdownIcon={true}
        menuItems={LanguageAction}
        width="w-36"
      />
      <button onClick={() => handleThemeToggle()} className="btn_actions">
        <Bell />
      </button>
      <button onClick={() => handleThemeToggle()} className="btn_actions">
        <Star />
      </button>
    </>
  );
}
