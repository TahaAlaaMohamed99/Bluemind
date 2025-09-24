import React from "react";
import TranslationText from "./TranslationText";
import { Iconloading } from "../Assets/Icons/IconsSvg";

import { useSelector } from "react-redux";
import getTranslationText from "../Utils/getTranslationText";

/**
 * A reusable and customizable button component with loading and translation support.
 *
 * @param {Object} props - The properties passed to the component.
 * @param {string} props.className - Additional custom classes for styling the button.
 * @param {string} [props.size="btn_lg"] - The size of the button (e.g., "btn_sm", "btn_md", "btn_lg").
 * @param {ReactNode} [props.icon] - Optional icon to display inside the button.
 * @param {string} props.title - The title or text for the button, used for display and translation.
 * @param {Function} props.onClick - The click handler function for the button.
 * @param {string} [props.type="button"] - The type of the button (e.g., "button", "submit", "reset").
 * @param {string} [props.ResourcePage=""] - The resource page identifier for translation purposes.
 * @param {boolean} [props.disabled=false] - Determines if the button should be disabled.
 * @param {boolean} [props.isLoading=false] - Determines if the button should display a loading state.
 *
 * @returns {JSX.Element} - A styled button element with optional loading and icon support.
 */
export default function CustomeBtn({
  className,
  size = "btn_lg",
  icon,
  title,
  onClick,
  type = "button",
  ResourcePage = "",
  disabled = false,
  isLoading = false,
  tooltip = null,
}) {
  // A mapping object for loading labels based on the button's title
  const labelLoading = {
    save: "loadingSave",
    edit: "loadingEdit",
  };
  const currentLanguage = useSelector(
    (state) => state.themeSlice.currentLanguage
  );
  return (
    <button
      type={type} // Button type (e.g., "button", "submit")
      aria-label={title} // Accessibility label for screen readers
      disabled={disabled} // Disables the button if `disabled` is true
      onClick={!disabled && !isLoading ? onClick : undefined} // Prevents click handling when disabled or loading
      className={
        "btn " +
        className +
        " " +
        size +
        (tooltip != null ? " tooltip_container" : "") +
        (disabled == true ? " disabled" : "")
      }
      data-tooltip={
        tooltip && getTranslationText({ title: tooltip, lang: currentLanguage })
      }
      // Dynamically applies classes for styling
    >
      {isLoading ? (
        // Loading state: Show a spinner icon and a loading message
        <>
          <Iconloading className="w-4 h-4 text-primary " />{" "}
          {/* Loading spinner */}
          {title && (
            <TranslationText
              title={labelLoading[title] || "loading..."} // Dynamically selects a loading message or defaults to "loading"
            />
          )}
        </>
      ) : (
        // Default state: Show optional icon and the translated title
        <>
          {icon && !isLoading && <span className="icon_btn">{icon}</span>}{" "}
          {/* Optional icon */}
          {title && (
            <span>
              <TranslationText
                page={ResourcePage}
                title={title} // Displays the translated button title
              />
            </span>
          )}
        </>
      )}
    </button>
  );
}
