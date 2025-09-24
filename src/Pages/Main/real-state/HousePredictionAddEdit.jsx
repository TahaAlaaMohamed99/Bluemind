import React, { useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import {
  resetBreadcrumb,
  setBreadcrumb,
} from "../../../Store/slices/layout-slice";
import { useDispatch } from "react-redux";
import { ArrowLeft, Upload } from "lucide-react";
import CustomInput from "../../../Components/Form/CustomInput";

const HousePredictionAddEdit = () => {
  const validationSchema = Yup.object().shape({
    bedrooms: Yup.number()
      .typeError("Must be a number")
      .required("Bedrooms is required")
      .min(1, "Must be at least 1"),
    bathrooms: Yup.number()
      .typeError("Must be a number")
      .required("Bathrooms is required")
      .min(1, "Must be at least 1"),
    livingArea: Yup.string().required("Living area is required"),
    totalArea: Yup.string().required("Total area is required"),
    floors: Yup.number()
      .typeError("Must be a number")
      .required("Floors is required")
      .min(1, "Must be at least 1"),
    bool: Yup.string().required("Select an option"),
    condition: Yup.string()
      .oneOf(["New", "Used"], "Select a valid condition")
      .required("Condition is required"),
  });
  const initialValues = {
    bedrooms: "",
    bathrooms: "",
    livingArea: "",
    totalArea: "",
    floors: "",
    bool: "no",
    condition: "",
  };
  const handleSubmit = (values) => {
    console.log("Form Submitted:", values);
  };
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
              Know what your audience talking about using our Media
              Monitoring...
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-2">
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ resetForm }) => (
                <Form className="flex flex-col gap-6">
                  {/* Bedrooms */}
                  <div className="flex flex-col">
                    <label className="mb-1 font-medium">
                      Bedrooms<span className="text-red-500">*</span>
                    </label>
                    <Field
                      type="number"
                      name="bedrooms"
                      value={5}
                      placeholder="Enter Number of Bedrooms"
                      className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <ErrorMessage
                      name="bedrooms"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>

                  {/* Bathrooms */}
                  <div className="flex flex-col">
                    <label className="mb-1 font-medium">
                      Bathrooms<span className="text-red-500">*</span>
                    </label>
                    <Field
                      type="number"
                      name="bathrooms"
                      value={8}
                      placeholder="Enter Number of Bathrooms"
                      className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <ErrorMessage
                      name="bathrooms"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>

                  {/* Living Area */}
                  <div className="flex flex-col">
                    <label className="mb-1 font-medium">Living Area</label>
                    <Field
                      type="text"
                      name="livingArea"
                      value={"right"}
                      placeholder="Enter Living Area"
                      className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <ErrorMessage
                      name="livingArea"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>

                  {/* Total Area */}
                  <div className="flex flex-col">
                    <label className="mb-1 font-medium">Total Area</label>
                    <Field
                      type="text"
                      name="totalArea"
                      value={9}
                      placeholder="Enter Total Area"
                      className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <ErrorMessage
                      name="totalArea"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>

                  {/* Floors */}
                  <div className="flex flex-col">
                    <label className="mb-1 font-medium">Floors</label>
                    <Field
                      type="number"
                      name="floors"
                      value={2}
                      placeholder="Enter Number of Floors"
                      className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <ErrorMessage
                      name="floors"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>

                  {/* Bool (Radio) */}
                  <div className="flex flex-col">
                    <label className="mb-1 font-medium">Bool</label>
                    <div className="flex items-center gap-4">
                      <label className="flex items-center gap-2">
                        <Field type="radio" name="bool" value="no" />
                        No
                      </label>
                      <label className="flex items-center gap-2">
                        <Field type="radio" name="bool" value="yes" />
                        Yes
                      </label>
                    </div>
                    <ErrorMessage
                      name="bool"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>

                  {/* Condition */}
                  <div className="flex flex-col col-span-2">
                    <label className="mb-1 font-medium">Condition</label>
                    <Field
                      as="select"
                      name="condition"
                      className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select a Condition</option>
                      <option selected value="New">
                        New
                      </option>
                      <option value="Used">Used</option>
                    </Field>
                    <ErrorMessage
                      name="condition"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>

                  {/* Buttons */}
                  <div className="flex gap-4 col-span-2 justify-end">
                    <button
                      type="button"
                      onClick={() => resetForm()}
                      className="px-6 py-2 text-gray-600 hover:text-gray-800 font-medium"
                    >
                      Clear
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors font-medium"
                    >
                      Submit
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
          <div className="lg:col-span-2">
            <div className="border rounded-lg p-4">
              <h3 className="text-sm font-medium text-gray-800 mb-2">
                House Prediction
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
        </div>
      </div>
    );
  };
  const handleBack = () => {
    navigate(-1);
  };
  useEffect(() => {
    dispatch(setBreadcrumb(["Media", "House Prediction", id]));
    return () => {
      dispatch(resetBreadcrumb());
    };
  }, [dispatch]);
  return (
    <>
      {id === "Add" && (
        // <div className="main-section px-4">
        //   <form className="grid grid-cols-2 gap-6">
        //     {/* Bedrooms */}
        //     <div className="flex flex-col">
        //       <label className="mb-1 font-medium">
        //         Bedrooms<span className="text-red-500">*</span>
        //       </label>
        //       <input
        //         type="number"
        //         placeholder="Enter Number of Bedrooms"
        //         className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        //       />
        //     </div>

        //     {/* Bathrooms */}
        //     <div className="flex flex-col">
        //       <label className="mb-1 font-medium">
        //         Bathrooms<span className="text-red-500">*</span>
        //       </label>
        //       <input
        //         type="number"
        //         placeholder="Enter Number of Bathrooms"
        //         className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        //       />
        //     </div>

        //     {/* Living Area */}
        //     <div className="flex flex-col">
        //       <label className="mb-1 font-medium">Living Area</label>
        //       <input
        //         type="text"
        //         placeholder="Enter Living Area"
        //         className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        //       />
        //     </div>

        //     {/* Total Area */}
        //     <div className="flex flex-col">
        //       <label className="mb-1 font-medium">Total Area</label>
        //       <input
        //         type="text"
        //         placeholder="Enter Total Area"
        //         className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        //       />
        //     </div>

        //     {/* Floors */}
        //     <div className="flex flex-col">
        //       <label className="mb-1 font-medium">Floors</label>
        //       <input
        //         type="number"
        //         placeholder="Enter Number of Floors"
        //         className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        //       />
        //     </div>

        //     {/* Bool (Radio) */}
        //     <div className="flex flex-col">
        //       <label className="mb-1 font-medium">Bool</label>
        //       <div className="flex items-center gap-4">
        //         <label className="flex items-center gap-2">
        //           <input type="radio" name="bool" value="no" defaultChecked />
        //           No
        //         </label>
        //         <label className="flex items-center gap-2">
        //           <input type="radio" name="bool" value="yes" />
        //           Yes
        //         </label>
        //       </div>
        //     </div>

        //     {/* Condition */}
        //     <div className="flex flex-col col-span-2">
        //       <label className="mb-1 font-medium">Condition</label>
        //       <select className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
        //         <option>Select a Condition</option>
        //         <option>New</option>
        //         <option>Used</option>
        //       </select>
        //     </div>

        //     {/* Buttons */}
        //     <div className="flex gap-4 col-span-2 justify-end">
        //       <button
        //         type="reset"
        //         className="px-6 py-2 text-gray-600 hover:text-gray-800 font-medium"
        //       >
        //         Clear
        //       </button>
        //       <button
        //         type="submit"
        //         className="px-6 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors font-medium"
        //       >
        //         Submit
        //       </button>
        //     </div>
        //   </form>
        // </div>
        <div className="main-section px-4">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ resetForm }) => (
              <Form className="grid grid-cols-2 gap-6">
                {/* Bedrooms */}
                <div className="flex flex-col">
                  <label className="mb-1 font-medium">
                    Bedrooms<span className="text-red-500">*</span>
                  </label>
                  <Field
                    type="number"
                    name="bedrooms"
                    placeholder="Enter Number of Bedrooms"
                    className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <ErrorMessage
                    name="bedrooms"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                {/* Bathrooms */}
                <div className="flex flex-col">
                  <label className="mb-1 font-medium">
                    Bathrooms<span className="text-red-500">*</span>
                  </label>
                  <Field
                    type="number"
                    name="bathrooms"
                    placeholder="Enter Number of Bathrooms"
                    className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <ErrorMessage
                    name="bathrooms"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                {/* Living Area */}
                <div className="flex flex-col">
                  <label className="mb-1 font-medium">Living Area</label>
                  <Field
                    type="text"
                    name="livingArea"
                    placeholder="Enter Living Area"
                    className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <ErrorMessage
                    name="livingArea"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                {/* Total Area */}
                <div className="flex flex-col">
                  <label className="mb-1 font-medium">Total Area</label>
                  <Field
                    type="text"
                    name="totalArea"
                    placeholder="Enter Total Area"
                    className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <ErrorMessage
                    name="totalArea"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                {/* Floors */}
                <div className="flex flex-col">
                  <label className="mb-1 font-medium">Floors</label>
                  <Field
                    type="number"
                    name="floors"
                    placeholder="Enter Number of Floors"
                    className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <ErrorMessage
                    name="floors"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                {/* Bool (Radio) */}
                <div className="flex flex-col">
                  <label className="mb-1 font-medium">Bool</label>
                  <div className="flex items-center gap-4">
                    <label className="flex items-center gap-2">
                      <Field type="radio" name="bool" value="no" />
                      No
                    </label>
                    <label className="flex items-center gap-2">
                      <Field type="radio" name="bool" value="yes" />
                      Yes
                    </label>
                  </div>
                  <ErrorMessage
                    name="bool"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                {/* Condition */}
                <div className="flex flex-col col-span-2">
                  <label className="mb-1 font-medium">Condition</label>
                  <Field
                    as="select"
                    name="condition"
                    className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select a Condition</option>
                    <option value="New">New</option>
                    <option value="Used">Used</option>
                  </Field>
                  <ErrorMessage
                    name="condition"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                {/* Buttons */}
                <div className="flex gap-4 col-span-2 justify-end">
                  <button
                    type="button"
                    onClick={() => resetForm()}
                    className="px-6 py-2 text-gray-600 hover:text-gray-800 font-medium"
                  >
                    Clear
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors font-medium"
                  >
                    Submit
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
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
export default HousePredictionAddEdit;
