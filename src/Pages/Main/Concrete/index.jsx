import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  resetBreadcrumb,
  setBreadcrumb,
} from "../../../Store/slices/layout-slice";
import { useDispatch } from "react-redux";
import FileUploadForm from "../../../Components/FileUploadForm";

const ConcreteAddEdit = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const accessToken = localStorage.getItem("accessToken");

  const handleBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    dispatch(setBreadcrumb(["Concrete", "Add Concrete"]));
    return () => {
      dispatch(resetBreadcrumb());
    };
  }, [dispatch, id]);

  return (
    <>
      {id == "Add" && (
        <FileUploadForm
          onBack={handleBack}
          title="Add New Concrete"
          accessToken={accessToken}
          endPoint="construction/predict"
          id={id}
        />
      )}
      {id !== "Add" && (
        <FileUploadForm
          onBack={handleBack}
          title="Edit Concrete"
          accessToken={accessToken}
          endPoint="construction/predict"
          id={id}
        />
      )}
    </>
  );
};

export default ConcreteAddEdit;
