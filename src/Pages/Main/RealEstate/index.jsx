import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  resetBreadcrumb,
  setBreadcrumb,
} from "../../../Store/slices/layout-slice";
import { useDispatch } from "react-redux";
import FileUploadForm from "../../../Components/FileUploadForm";

const RealEstateAddEdit = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const accessToken = localStorage.getItem("accessToken");

  const handleBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    dispatch(setBreadcrumb(["Real Estate", "Add Real Estate"]));
    return () => {
      dispatch(resetBreadcrumb());
    };
  }, [dispatch, id]);

  return (
    <>
      {id == "Add" && (
        <FileUploadForm
          onBack={handleBack}
          title="Add New Real Estate"
          accessToken={accessToken}
          endPoint="real-estate/predict"
          id={id}
          template="realEstate"
        />
      )}
      {id !== "Add" && (
        <FileUploadForm
          onBack={handleBack}
          title="Edit Real Estate"
          accessToken={accessToken}
          endPoint="real-estate/predict"
          id={id}
          template="realEstate"
        />
      )}
    </>
  );
};

export default RealEstateAddEdit;
