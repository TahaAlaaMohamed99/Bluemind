import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  resetBreadcrumb,
  setBreadcrumb,
} from "../../../Store/slices/layout-slice";
import { useDispatch } from "react-redux";
import FileUploadForm from "../../../Components/FileUploadForm";

const SalesAddEdit = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const accessToken = localStorage.getItem("accessToken");

  const handleBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    dispatch(setBreadcrumb(["Sales", "Add Sales"]));
    return () => {
      dispatch(resetBreadcrumb());
    };
  }, [dispatch, id]);

  return (
    <>
      {id == "Add" && (
        <FileUploadForm
          onBack={handleBack}
          title="Add New Sales"
          accessToken={accessToken}
          endPoint="sales/sales_prediction"
          id={id}
        />
      )}
      {id !== "Add" && (
        <FileUploadForm
          onBack={handleBack}
          title="Edit Sales"
          accessToken={accessToken}
          endPoint="sales/sales_prediction"
          id={id}
        />
      )}
    </>
  );
};

export default SalesAddEdit;
