import React from "react";

function FlagComponent({ data }) {
  const handleCopy = () => {
    if (data) {
      navigator.clipboard.writeText(JSON.stringify(data, null, 2));
      alert("Data copied to clipboard!");
    }
  };

  return (
    <div className="lg:col-span-2 ">
      <div className="border rounded-lg p-4">
        <h3 className="text-sm font-medium dark:text-titleColor-dark text-gray-800 mb-2">
          Class Occurrences
        </h3>
        <div className="border dark:border-border-dark rounded-md dark:bg-background-cardDark bg-white h-[153px] flex items-center justify-center overflow-auto p-2">
          {data ? (
            <pre className="text-xs text-gray-700 whitespace-pre-wrap">
              {JSON.stringify(data, null, 2)}{" "}
            </pre>
          ) : (
            <span className="text-gray-400 text-3xl">{`{...}`}</span>
          )}
        </div>
        <button
          type="button"
          onClick={handleCopy}
          disabled={!data}
          className="w-full mt-3 py-2 rounded-md bg-gray-50 text-gray-800 dark:text-titleColor-dark dark:bg-background-cardDark font-medium cursor-pointer dark:hover:bg-background-cardDark hover:text-primary disabled:opacity-50"
        >
          Flag
        </button>
      </div>
    </div>
  );
}

export default FlagComponent;
