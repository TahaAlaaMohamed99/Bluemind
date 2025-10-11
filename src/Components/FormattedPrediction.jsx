import React from "react";

export default function FormattedPrediction({ data, type }) {
  if (!data) return <p className="text-gray-400 text-sm">{`{...}`}</p>;

  const predictions = data?.predictions;

  if (type == "number") {
    return (
      <div className="space-y-2 text-xs text-gray-800 dark:text-textColor-dark">
        <ul className=" space-y-2">
          {predictions.map((num, i) => (
            <div className="flex gap-4">
              <p className="text-primary">
                {i + 1}
                {")"}
              </p>
              {""}
              <li key={i}>{num}</li>
              <br />
            </div>
          ))}
        </ul>
      </div>
    );
  }

  // 🟦 الحالة الثانية: Text Analysis — لما تكون predictions عبارة عن object فيه { نص : label }
  if (type == "text") {
    return (
      <div className="space-y-3">
        {Object.entries(predictions).map(([text, label], index) => (
          <div
            key={index}
            className="border-b border-gray-200 dark:border-border-dark pb-2"
          >
            <p className="text-xs text-gray-700 dark:text-textColor-dark mb-1">
              <span className="font-medium text-primary dark:text-primary">
                Text:
              </span>{" "}
              {text}
            </p>
            <p className="text-xs">
              <span className="font-medium text-green-700 dark:text-green-400">
                Label:
              </span>{" "}
              {label}
            </p>
          </div>
        ))}
      </div>
    );
  }

  // fallback — لو شكل الداتا جديد مش معروف
  return (
    <pre className="text-xs whitespace-pre-wrap text-gray-700 dark:text-textColor-dark">
      {JSON.stringify(data, null, 2)}
    </pre>
  );
}
