import { useLayoutEffect } from "react";
import { useDispatch } from "react-redux";
import { toggleDarkMode } from "../Store/slices/themeSlice";

export function useTheme() {
    const dispatch = useDispatch();

    useLayoutEffect(() => {
        const initializeTheme = () => {
            const storedTheme = localStorage.getItem("theme");

            if (!storedTheme) {
                const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
                const defaultTheme = prefersDark ? "dark" : "light";
                dispatch(toggleDarkMode(defaultTheme));
                localStorage.setItem("theme", defaultTheme);
            } else {
                dispatch(toggleDarkMode(storedTheme));
            }
        };

        initializeTheme();
    }, [dispatch]);
}
