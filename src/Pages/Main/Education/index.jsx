import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  resetBreadcrumb,
  setBreadcrumb,
} from "../../../Store/slices/layout-slice";
import { useDispatch } from "react-redux";
import FileUploadForm from "../../../Components/FileUploadForm";

const EducationAddEdit = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const accessToken = localStorage.getItem("accessToken");

  const handleBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    dispatch(setBreadcrumb(["Education", "Add Education"]));
    return () => {
      dispatch(resetBreadcrumb());
    };
  }, [dispatch, id]);

  return (
    <>
      {id == "Add" && (
        <FileUploadForm
          onBack={handleBack}
          title="Add New Education"
          accessToken={accessToken}
          endPoint="education/predict"
          id={id}
          template="education"
          type="number"
        />
      )}
      {id !== "Add" && (
        <FileUploadForm
          onBack={handleBack}
          title="Edit Education"
          accessToken={accessToken}
          endPoint="education/predict"
          id={id}
          type="number"
          template="education"
        />
      )}
    </>
  );
};

export default EducationAddEdit;
