import React from "react";

export default function FormattedPrediction({ data, type }) {
  if (!data) return <p className="text-gray-400 text-sm">{`{...}`}</p>;

  const predictions = data?.predictions;

  // 🟦 الحالة الأولى: Number Predictions — عرضها في كروت صغيرة
  if (type === "number") {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {predictions.map((num, i) => (
          <div
            key={i}
            className="border dark:border-border-dark bg-white dark:bg-background-cardDark rounded-lg p-3 shadow-sm"
          >
            <p className="text-xs text-primary  mb-1">#{i + 1}</p>
            <p className="text-sm font-medium text-gray-800 dark:text-titleColor-dark">
              {num}
            </p>
          </div>
        ))}
      </div>
    );
  }

  // 🟩 الحالة الثانية: Text Predictions — عرضها في كروت فيها Text + Label
  if (type === "text") {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {Object.entries(predictions).map(([text, label], index) => (
          <div
            key={index}
            className="border dark:border-border-dark bg-white dark:bg-background-cardDark rounded-lg p-3 shadow-sm"
          >
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
              Text
            </p>
            <p className="text-sm text-gray-800 dark:text-textColor-dark mb-2 ">
              {text}
            </p>
            <p className="text-xs font-medium text-primary ">Label: {label}</p>
          </div>
        ))}
      </div>
    );
  }

  // 🟧 fallback — لو شكل الداتا غير معروف
  return (
    <pre className="text-xs whitespace-pre-wrap text-gray-700 dark:text-textColor-dark">
      {JSON.stringify(data, null, 2)}
    </pre>
  );
}
