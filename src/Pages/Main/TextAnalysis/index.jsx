import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  resetBreadcrumb,
  setBreadcrumb,
} from "../../../Store/slices/layout-slice";
import { useDispatch } from "react-redux";
import FileUploadForm from "../../../Components/FileUploadForm";

const TextAnalysisAddEdit = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const accessToken = localStorage.getItem("accessToken");

  const handleBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    dispatch(setBreadcrumb(["Text Analysis", "Add Text Analysis"]));
    return () => {
      dispatch(resetBreadcrumb());
    };
  }, [dispatch, id]);

  return (
    <>
      {id == "Add" && (
        <FileUploadForm
          onBack={handleBack}
          title="Add New Text Analysis"
          accessToken={accessToken}
          endPoint="TextAnalysis/text_analysis"
          id={id}
          template="text_analysis"
          type="text"
        />
      )}
      {id !== "Add" && (
        <FileUploadForm
          onBack={handleBack}
          title="Edit Text Analysis"
          accessToken={accessToken}
          endPoint="TextAnalysis/text_analysis"
          id={id}
          template="text_analysis"
          type="text"
        />
      )}
    </>
  );
};

export default TextAnalysisAddEdit;
