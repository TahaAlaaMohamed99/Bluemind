import React, { useEffect, useRef, useState } from "react";
import TranslationText from "./TranslationText";
import { IconDropdownIcon } from "../Assets/Icons/IconsSvg";
export default function DropdownActions({
    className,
    isActiveClassName = "",
    icon,
    ResourcePage = '',
    title,
    menuItems = [],
    isDropdownIcon = false,
}) {
    const [isOpen, setIsOpen] = useState(false);

    const dropdownRef = useRef(null);
    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };
    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsOpen(false);
        }
    };
    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);
    return (
        <div ref={dropdownRef} className={`relative flex justify-center`}>
            <button
                type="button"
                className={`${className} ${isOpen && isActiveClassName} `}
                onClick={() => toggleDropdown()}
            >
                {icon && <span className="w-5 h-5 me-1">
                    {icon}
                    </span>} {title && <span className="title">{title}</span>}
                {isDropdownIcon &&
                <span className="w-3  ms-2 flex items-center justify-center">
                    <IconDropdownIcon />

                </span>
                }
            </button>
            {menuItems.length > 0 && (
                <div
                    id="dropdownMenu"
                    className={`z-40 ${isOpen ? "block" : "hidden"
                        } bg-background-cardLight dark:bg-background-cardDark rounded-lg  min-w-full wax-w-36 p-2   absolute ltr:right-0 rtl:left-0 top-11`}
                >
                    <ul className="flex flex-col gap-1.5 ">
                        {menuItems.map((item, index) => (
                            <li key={index}>
                                <button
                                    type="button"
                                    onClick={(e) => {
                                        item.onClick(e);
                                        toggleDropdown();
                                    }}
                                    className={
                                        "btn_Item flex items-center p-2.5 font-medium  w-full text-start text-sm capitalize rounded-md hover:text-scondary dark:hover:text-primary   " +
                                        (item.isActive
                                            ? "text-secondary bg-background-light dark:bg-background-drak dark:text-primary"
                                            : "text-titleColor-light dark:text-titleColor-dark")
                                    }
                                >
                                    {item.icon && <span className="icon w-4 h-4 me-2"> {item.icon}</span>}
                                    <TranslationText page={ResourcePage} title={item.label} />
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}
