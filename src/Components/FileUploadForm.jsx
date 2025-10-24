import React, { useState } from "react";
import { Upload, ArrowLeft, UploadIcon } from "lucide-react";
import useFileUpload from "../Utils/useFileUpload";
import FlagComponent from "./FlagComponent";
import CustomeBtn from "./CustomeBtn";
import ChartComponent from "./Chart";

const FileUploadForm = ({
  onBack,
  title,
  showClassOccurrences = false,
  accessToken,
  endPoint,
  id,
  template,
  type,
}) => {
  const [dragActive, setDragActive] = useState(false);
  const [file, setFile] = useState(null);
  const { handleSubmit, loading, data } = useFileUpload(accessToken, endPoint);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileSelect = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };
  const titleToChart = title.split(" ");
  const re = `${titleToChart[2]} ${titleToChart[3] ? titleToChart[3] : ""}`;
  console.log(data, "data");
  return (
    <div className="main-section dark:bg-background-dark  ">
      <div className="mb-6 flex items-center space-x-4 ">
        {/* <button
          onClick={onBack}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-gray-600 dark:text-primary" />
        </button> */}
        <div>
          <h1 className="text-xl font-bold text-gray-900 dark:text-titleColor-dark">
            {title}
          </h1>
          <p className="text-gray-600 text-sm mt-1 dark:text-titleColor-dark">
            Know what your audience talking about using our Media Monitoring...
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 ">
        <div className="lg:col-span-2">
          <div
            className={`border-2 border-dashed dark:border-border-dark rounded-xl py-4 h-[210px]  w-[474px] text-center transition-colors dark:bg-background-cardDark ${
              dragActive ? "border-blue-400 bg-blue-50" : "border-gray-300  "
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <div className="  ">
              <div className="mx-auto w-16 h-16 text-textColor-light rounded-full flex items-center justify-center ">
                <UploadIcon className="w-8 h-8  " />
              </div>
              <div>
                <p className="text-lg font-medium mb-2 text-gray-900 dark:text-titleColor-dark ">
                  Choose a file or drag & drop it here
                </p>
                {file && (
                  <p className="text-sm text-green-600 mt-2">
                    Selected: {file.name}
                  </p>
                )}
              </div>
              <div>
                {!file && (
                  <div>
                    <label className="inline-flex items-center border mx-auto border-border-light w-[130px] h-[34px] dark:hover:bg-background-dark dark:hover:text-primary bg-background-cardLight dark:bg-background-dark dark:text-titleColor-dark hover:bg-gray-200 text-gray-700 rounded-lg cursor-pointer transition-colors">
                      <span className="text-center text-textColor-light w-full">
                        Browse File
                      </span>
                      <input
                        type="file"
                        className="hidden"
                        onChange={handleFileSelect}
                        accept=".csv,.xlsx,.xls,.txt"
                      />
                    </label>
                    {template && (
                      <div className="mt-3">
                        <a
                          href={`/templates/${template}.xlsx`}
                          download
                          className="text-xs text-primary   "
                        >
                          Download {template} Template
                        </a>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center mt-6">
            <CustomeBtn
              onClick={() => setFile(null)}
              type="button"
              title="Clear"
              className="btn-default  w-[179px] h-[44px]"
            />

            <CustomeBtn
              title={"Submit"}
              isLoading={loading}
              onClick={() => handleSubmit(file)}
              disabled={loading}
              className="btn-primary w-[179px] h-[44px] "
            />
          </div>
        </div>

        <FlagComponent type={type} data={data} />
        {data && (
          <ChartComponent data={data} dataType={type} type="bar" title={re} />
        )}
      </div>
    </div>
  );
};

export default FileUploadForm;
