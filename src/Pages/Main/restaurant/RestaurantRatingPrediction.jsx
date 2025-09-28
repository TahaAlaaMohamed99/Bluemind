import { ArrowLeft, BarChart3, FileText, Plus, Upload } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  resetBreadcrumb,
  setBreadcrumb,
} from "../../../Store/slices/layout-slice";
import { useNavigate } from "react-router-dom";

const RestaurantRatingPrediction = () => {
  const navigate = useNavigate();
  const [currentView, setCurrentView] = useState("cards");
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setBreadcrumb(["Real State", "Restaurant Rating Prediction"]));
    return () => {
      dispatch(resetBreadcrumb());
    };
  }, [dispatch]);

  const MediaMonitoringCards = ({ onCardClick }) => {
    const cards = [
      {
        id: "add",
        title: "Add New Restaurant Rating Prediction",
        description: "Enter Restaurant details, get predicted rating.",
        icon: Plus,
        isAdd: true,
      },
      {
        id: "plans",
        title: "Plans",
        description:
          "Create and manage monitoring plans for your media content",
        icon: BarChart3,
        isAdd: false,
      },
      {
        id: "roster",
        title: "Roster",
        description: "View and organize your media monitoring roster",
        icon: FileText,
        isAdd: false,
      },
    ];

    const getIconColors = (color) => {
      switch (color) {
        case "blue":
          return "text-blue-600";
        case "green":
          return "text-green-600";
        case "purple":
          return "text-purple-600";
        default:
          return "text-gray-600";
      }
    };

    return (
      <div className="main-section">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Restaurant Rating Prediction
          </h1>
          <p className="text-gray-600">
            Choose an option to get started with media monitoring
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map((card) => {
            const IconComponent = card.icon;
            return (
              <>
                {card.isAdd && (
                  <div
                    key={card.id}
                    onClick={() => onCardClick(card.id)}
                    className={`p-6 border-2 border-dashed rounded-xl cursor-pointer transition-all duration-200 hover:shadow-lg`}
                  >
                    <div className="flex flex-col items-center text-center space-y-4">
                      <div className={`p-4 rounded-full bg-white shadow-sm`}>
                        <IconComponent
                          className={`w-8 h-8 ${getIconColors(card.color)}`}
                        />
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900">
                        {card.title}
                      </h3>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {card.description}
                      </p>
                    </div>
                  </div>
                )}
                {!card.isAdd && (
                  <div
                    key={card.id}
                    onClick={() => onCardClick(card.id)}
                    className={`p-6 border-2 border-dashed rounded-xl cursor-pointer transition-all duration-200 hover:shadow-lg`}
                  >
                    <div className="flex flex-col items-center text-center space-y-4">
                      <div className={`p-4 rounded-full bg-white shadow-sm`}>
                        <IconComponent
                          className={`w-8 h-8 ${getIconColors(card.color)}`}
                        />
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900">
                        {card.title}
                      </h3>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {card.description}
                      </p>
                    </div>
                  </div>
                )}
              </>
            );
          })}
        </div>
      </div>
    );
  };
  const handleCardClick = (cardId) => {
    if (cardId === "add") {
      navigate(`/resturantRatingPrediction/Add`);
    } else if (cardId === "plans") {
      navigate(`/resturantRatingPrediction/${cardId}`);
    } else if (cardId === "roster") {
      navigate(`/resturantRatingPrediction/${cardId}`);
    }
  };

  const FileUploadForm = ({ onBack, title, showClassOccurrences = false }) => {
    const [dragActive, setDragActive] = useState(false);
    const [file, setFile] = useState(null);

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
          <button
            onClick={onBack}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
            <p className="text-gray-600 text-sm mt-1">
              Know what your audience talking about using our Real State
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
              <button className="px-6 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors font-medium">
                {title === "Add New House Prediction" ? "Submit" : "Edit"}
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
    setCurrentView("cards");
    dispatch(setBreadcrumb(["Real State", "House Prediction"]));
  };
  const renderContent = () => {
    switch (currentView) {
      case "add":
        return (
          <FileUploadForm
            onBack={handleBack}
            title="Add New House Prediction"
          />
        );
      case "plans":
        return (
          <FileUploadForm
            onBack={handleBack}
            title="Plans"
            showClassOccurrences={true}
          />
        );
      case "roster":
        return (
          <FileUploadForm
            onBack={handleBack}
            title="Roster"
            showClassOccurrences={true}
          />
        );
      default:
        return <MediaMonitoringCards onCardClick={handleCardClick} />;
    }
  };

  return (
    <div className="min-h-screen">
      <main className="flex-1">{renderContent()}</main>
    </div>
  );
};
export default RestaurantRatingPrediction;
