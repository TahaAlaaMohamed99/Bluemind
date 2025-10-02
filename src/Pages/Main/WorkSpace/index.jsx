import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  resetBreadcrumb,
  setBreadcrumb,
} from "../../../Store/slices/layout-slice";
import { useNavigate } from "react-router-dom";
import AddComponent from "../../../Components/AddComponent";

import Api from "../../../Api/api";
import { notifyError } from "../../../Utils/Notification";

const WorkSpace = () => {
  const navigate = useNavigate();

  const [pageSize, setPageSize] = useState(10);
  const [pageNumber, setPageNumber] = useState(1);
  const [workSpacesData, setWorkSpacesData] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setBreadcrumb(["Work Space"]));
    return () => {
      dispatch(resetBreadcrumb());
    };
  }, [dispatch]);

  const handleCardClick = (cardId) => {
    if (cardId === "add") {
      navigate(`/workspace/add`);
    }
  };

  const getWorkSpaces = async () => {
    try {
      const response = await Api.get(
        `/workspace/workspaces/?page=${pageNumber}&page_size=${pageSize}`
      );

      if (response && response.data) {
        setWorkSpacesData(response?.data?.data || []);
      }
    } catch (error) {
      if (error.response) {
        notifyError("Server error occurred");
      } else if (error.request) {
        notifyError("Network error, please try again later");
      } else {
        notifyError("Unexpected error occurred");
      }
    }
  };

  useEffect(() => {
    getWorkSpaces();
  }, []);

  return (
    <div className="main-section dark:bg-background-dark">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AddComponent
          IconComponent={Plus}
          onCardClick={() => handleCardClick("add")}
          title={"Work Space"}
          description={"Choose an option to get started with Work Space"}
        />
      </div>
    </div>
  );
};
export default WorkSpace;
