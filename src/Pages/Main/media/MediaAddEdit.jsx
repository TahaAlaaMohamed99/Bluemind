import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  resetBreadcrumb,
  setBreadcrumb,
} from "../../../Store/slices/layout-slice";
import { useDispatch } from "react-redux";
import FileUploadForm from "../../../Components/FileUploadForm";

const MediaAddEdit = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const accessToken = localStorage.getItem("accessToken");

  const handleBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    dispatch(setBreadcrumb(["Media", "Media Monitoring"]));
    return () => {
      dispatch(resetBreadcrumb());
    };
  }, [dispatch, id]);

  return (
    <div className="dark:bg-background-dark">
      {id == "Add" && (
        <FileUploadForm
          onBack={handleBack}
          title="Add New Media Monitoring"
          accessToken={accessToken}
          endPoint="media/predict"
          id={id}
          template="media"
          type="text"
        />
      )}
      {id !== "Add" && (
        <FileUploadForm
          onBack={handleBack}
          title={id}
          showClassOccurrences={true}
          accessToken={accessToken}
          endPoint="media/predict"
          id={id}
          template="media"
          type="text"
        />
      )}
    </div>
  );
};

export default MediaAddEdit;
