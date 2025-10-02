import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  resetBreadcrumb,
  setBreadcrumb,
} from "../../../Store/slices/layout-slice";
import { useDispatch } from "react-redux";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { notifyError } from "../../../Utils/Notification";
import Api from "../../../Api/api";

const WorkSpaceAddEdit = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    dispatch(
      setBreadcrumb([
        "Work Space",
        id === "add" ? "Add Work Space" : "Edit Work Space",
      ])
    );
    return () => {
      dispatch(resetBreadcrumb());
    };
  }, [dispatch, id]);

  const validationSchema = Yup.object({
    name: Yup.string().required("Workspace name is required"),
    description: Yup.string().required("Workspace description is required"),
    is_public: Yup.boolean(),
  });

  const handleSave = async (values) => {
    setIsLoading(true);
    try {
      const formdata = new FormData();
      formdata.append("name", values.name);
      formdata.append("description", values.description);
      formdata.append("is_public", values.is_public);
      // 3shan tkdr tst5dm el Api server deh lazem tkon el token valid >> lsa mesh 3mlna enha lma tkon expired ytl3o bra 3la el login || use refreshToken
      const response = await Api.post("/workspace/workspaces", formdata);

      navigate("/workspace");
    } catch (error) {
      notifyError("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="main-section w-[80%] dark:bg-background-dark">
      <div className="p-5 space-y-4 rounded-lg w-full">
        <h1 className="text-xl font-semibold dark:text-titleColor-dark">
          {id === "add" ? "Add Workspace" : "Edit Workspace"}
        </h1>

        <Formik
          initialValues={{
            name: "",
            description: "",
            is_public: false,
          }}
          validationSchema={validationSchema}
          onSubmit={handleSave}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-4">
              <div>
                <label
                  className="block mb-1 dark:text-titleColor-dark"
                  htmlFor="name"
                >
                  Name
                </label>
                <Field
                  id="name"
                  type="text"
                  name="name"
                  placeholder="Workspace name"
                  className="border-2 focus:border-primary dark:bg-background-cardDark focus:outline-none w-full border-border-light rounded-lg p-2 block"
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <div>
                <label
                  className="block mb-1 dark:text-titleColor-dark "
                  htmlFor="description"
                >
                  Description
                </label>
                <Field
                  id="description"
                  type="text"
                  name="description"
                  placeholder="Workspace description"
                  className="border-2 focus:border-primary dark:bg-background-cardDark focus:outline-none w-full border-border-light rounded-lg p-2 block"
                />
                <ErrorMessage
                  name="description"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <div className="flex items-center space-x-2">
                <Field
                  id="is_public"
                  type="checkbox"
                  name="is_public"
                  className="w-4 h-4"
                />
                <label
                  htmlFor="is_public"
                  className="text-sm dark:text-titleColor-dark"
                >
                  Is Public
                </label>
              </div>

              <button
                type="submit"
                disabled={isSubmitting || isLoading}
                className="bg-[#00113F] text-white dark:bg-background-cardDark w-[179px] h-[44px] rounded-lg font-bold px-4 py-2 disabled:opacity-50"
              >
                {isSubmitting || isLoading ? "Saving..." : "Save"}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </section>
  );
};

export default WorkSpaceAddEdit;
