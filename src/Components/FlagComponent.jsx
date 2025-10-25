import React, { useState } from "react";
import CustomeBtn from "./CustomeBtn";
import FormattedPrediction from "./FormattedPrediction";

function FlagComponent({ data, type }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (data) {
      navigator.clipboard.writeText(JSON.stringify(data, null, 2));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // استخراج الـ predictions لو موجودة
  const predictions = data?.predictions;

  return (
    <div className="lg:col-span-2 mt-6">
      <div
        className={!data ? "border dark:border-border-dark rounded-lg p-4" : ""}
      >
        {!data && (
          <h3 className="text-sm font-medium dark:text-titleColor-dark text-gray-800 mb-2">
            Class Occurrences
          </h3>
        )}
        <div className="rounded-md overflow-hidden h-[250px]">
          <div className="flag-scroll overflow-auto h-full p-2 border dark:border-border-dark rounded-md dark:bg-background-cardDark bg-white">
            {predictions ? (
              <FormattedPrediction type={type} data={data} />
            ) : (
              <div className="h-full flex items-center justify-center">
                <span className="text-gray-400 text-3xl">{`{...}`}</span>
              </div>
            )}
          </div>
        </div>

        <CustomeBtn
          onClick={handleCopy}
          disabled={!data}
          type="button"
          title={copied ? "Copied!" : "Flag"}
          className="btn-default mt-3 w-full"
        />
      </div>
    </div>
  );
}

export default FlagComponent;
