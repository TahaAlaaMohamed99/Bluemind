// ConfirmationModal.jsx
import React from "react";
import ReactDOM from "react-dom";

export default function ConfirmationModal({
  isOpen,
  onClose,
  title,
  description,
  onConfirm,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  type,
}) {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-[2000] flex items-center justify-center bg-black/50 ">
      <div className="bg-white dark:bg-background-cardDark rounded-lg shadow-lg w-[360px] p-6">
        <h2 className="text-lg font-semibold mb-2 dark:text-white">{title}</h2>
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
          {description}
        </p>
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            {cancelLabel}
          </button>
          <button
            onClick={onConfirm}
            className={`${
              type == "danger" ? "bg-red-600 text-white" : "bg-primary"
            } px-4 py-2 rounded-md  text-white `}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>,
    document.body // 👈 this is the key
  );
}
