import React from "react";

function FlagComponent({ data }) {
  const handleCopy = () => {
    if (data) {
      navigator.clipboard.writeText(JSON.stringify(data, null, 2));
      alert("Data copied to clipboard!");
    }
  };

  return (
    <div className="lg:col-span-2">
      <div className="border rounded-lg p-4">
        <h3 className="text-sm font-medium text-gray-800 mb-2">
          Class Occurrences
        </h3>
        <div className="border rounded-md bg-white h-48 flex items-center justify-center overflow-auto p-2">
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
          className="w-full mt-3 py-2 rounded-md bg-gray-50 text-gray-800 font-medium hover:bg-gray-100 disabled:opacity-50"
        >
          Flag
        </button>
      </div>
    </div>
  );
}

export default FlagComponent;
