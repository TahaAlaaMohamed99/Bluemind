import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  resetBreadcrumb,
  setBreadcrumb,
} from "../../../Store/slices/layout-slice";
import { useNavigate } from "react-router-dom";
import AddComponent from "../../../Components/AddComponent";

const WorkSpace = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
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
