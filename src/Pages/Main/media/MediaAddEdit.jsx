import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  resetBreadcrumb,
  setBreadcrumb,
} from "../../../Store/slices/layout-slice";
import { useDispatch } from "react-redux";
import { ArrowLeft, Upload } from "lucide-react";

const MediaAddEdit = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const accessToken = localStorage.getItem("accessToken");

  const FileUploadForm = ({ onBack, title, showClassOccurrences = false }) => {
    const [dragActive, setDragActive] = useState(false);
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);

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

    // ====== رفع الملف ======
    const handleSubmit = async () => {
      if (!file) {
        alert("Please select a file first!");
        return;
      }

      try {
        setLoading(true);
        const formData = new FormData();
        formData.append("csv_file", file);
        const response = await fetch("http://54.235.109.101/media/predict/", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,  
            Cookie:
              "csrftoken=M30Y6s2zXMnH4OW7OOjv3xBs9gOZM1Kg; sessionid=8tt0uig05fyvoj66xo9qbjfwutuohbk5",
          },
          body: formData,
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
        const data = await response.json();
        console.log("Success:", data);
        alert("File uploaded successfully!");
      } catch (error) {
        console.error("Upload failed:", error);
        alert("Upload failed, please try again.");
      } finally {
        setLoading(false);
      }
    };

    return (
      <div className="main-section">
        <div className="mb-6 flex items-center space-x-4">
          <button
            onClick={onBack}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
            <p className="text-gray-600 text-sm mt-1">
              Know what your audience talking about using our Media Monitoring...
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-2">
            <div
              className={`border-2 border-dashed rounded-xl p-12 text-center transition-colors ${
                dragActive
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
                onClick={handleSubmit}
                disabled={loading}
                className="px-6 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors font-medium disabled:opacity-50"
              >
                {loading
                  ? "Uploading..."
                  : title === "Add New Media Monitoring"
                  ? "Submit"
                  : "Edit"}
              </button>
            </div>
          </div>

          {showClassOccurrences && (
            <div className="lg:col-span-2">
              <div className="border rounded-lg p-4">
                <h3 className="text-sm font-medium text-gray-800 mb-2">
                  Class Occurrences
                </h3>

                <div className="border rounded-md bg-white h-28 flex items-center justify-center">
                  <span className="text-gray-400 text-3xl">{`{...}`}</span>
                </div>

                <button
                  type="button"
                  className="w-full mt-3 py-2 rounded-md bg-gray-50 text-gray-800 font-medium hover:bg-gray-100"
                >
                  Flag
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  const handleBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    dispatch(setBreadcrumb(["Media", "Media Monitoring", id]));
    return () => {
      dispatch(resetBreadcrumb());
    };
  }, [dispatch, id]);

  return (
    <>
      {id === "Add" && (
        <FileUploadForm onBack={handleBack} title="Add New Media Monitoring" />
      )}

      {id !== "Add" && (
        <FileUploadForm
          onBack={handleBack}
          title={id}
          showClassOccurrences={true}
        />
      )}
    </>
  );
};

export default MediaAddEdit;
