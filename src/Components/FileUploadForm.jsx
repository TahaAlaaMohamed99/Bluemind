import React, { useState } from "react";
import { Upload, ArrowLeft } from "lucide-react";
import useFileUpload from "../Utils/useFileUpload";
import FlagComponent from "./FlagComponent";

const FileUploadForm = ({
  onBack,
  title,
  showClassOccurrences = false,
  accessToken,
  endPoint,
  id,
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

  return (
    <div className="main-section">
      <div className="mb-6 flex items-center space-x-4">
        {/* <button
          onClick={onBack}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-gray-600" />
        </button> */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
          <p className="text-gray-600 text-sm mt-1">
            Know what your audience talking about using our ...
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-2">
          <div
            className={`border-2 border-dashed rounded-xl p-12 text-center transition-colors ${dragActive
                ? "border-blue-400 bg-blue-50"
                : "border-gray-300 hover:border-gray-400"
              }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <div className="space-y-4">
              <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                <Upload className="w-8 h-8 text-gray-400" />
              </div>
              <div>
                <p className="text-lg font-medium text-gray-900">
                  Choose a file or drag & drop it here
                </p>
                {file && (
                  <p className="text-sm text-green-600 mt-2">
                    Selected: {file.name}
                  </p>
                )}
              </div>
              <div>
                <label className="inline-flex items-center px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg cursor-pointer transition-colors">
                  <span>Browse File</span>
                  <input
                    type="file"
                    className="hidden"
                    onChange={handleFileSelect}
                    accept=".csv,.xlsx,.xls,.txt"
                  />
                </label>
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center mt-8">
            <button
              onClick={() => setFile(null)}
              className="px-6 py-2 text-gray-600 hover:text-gray-800 font-medium"
            >
              Clear
            </button>
            <button
              onClick={() => handleSubmit(file)}
              disabled={loading}
              className="px-6 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors font-medium disabled:opacity-50"
            >
              {loading ? "Uploading..." : "Submit"}
            </button>
          </div>
        </div>

        <FlagComponent data={data} />
      </div>
    </div>
  );
};

export default FileUploadForm;
