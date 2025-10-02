import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  resetBreadcrumb,
  setBreadcrumb,
} from "../../../Store/slices/layout-slice";
import { useDispatch } from "react-redux";
import axios from "axios";

const WorkSpaceAddEdit = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
   const [formData, setFormData] = useState({
    name: "",
    description: "",
    is_public: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const accessToken = localStorage.getItem("accessToken");

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

  const handleChange = (e) => {
    const { name, type, value, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSave = async (values) => {
    if (!formData.name || !formData.description) {
      alert("Please fill in all fields!");
      return;
    }
  
    try {
      const formdata = new FormData();
      formdata.append("name", formData.name);
      formdata.append("description", formData.description);
      formdata.append("is_public", formData.is_public);
  
      const response = await axios.post(
        "http://54.235.109.101/workspace/workspaces/",
        formdata,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            // لو مش محتاج الكوكيز بلاش تبعتها
          },
        }
      );
  
      console.log(response?.data);
    } catch (error) {
      console.error("Login error:", error);
    } finally {
      setIsLoading(false);
    }
  };
  

  return (
    <section className="main-section w-[80%] dark:bg-background-dark">
      <div className=" p-5 space-y-4 rounded-lg w-full">
        <h1 className="text-xl font-semibold dark:text-titleColor-dark">
          {id === "add" ? "Add Workspace" : "Edit Workspace"}
        </h1>

        <div>
          <label
            className="block mb-1  dark:text-titleColor-dark"
            htmlFor="name"
          >
            Name
          </label>
          <input
            id="name"
            type="text"
            name="name"
            placeholder="Workspace name"
            value={formData.name}
            onChange={handleChange}
            className="border focus:border-primary dark:bg-background-cardDark focus:outline-none w-full  border-border-light rounded-lg p-2 block"
          />
        </div>

        <div>
          <label
            className="block mb-1 dark:text-titleColor-dark "
            htmlFor="description"
          >
            Description
          </label>
          <input
            id="description"
            type="text"
            name="description"
            placeholder="Workspace description"
            value={formData.description}
            onChange={handleChange}
            className="border  focus:border-primary dark:bg-background-cardDark focus:outline-none w-full border-border-light rounded-lg p-2 block"
          />
        </div>

        <div className="flex items-center space-x-2">
          <input
            id="is_public"
            type="checkbox"
            name="is_public"
            checked={formData.is_public}
            onChange={handleChange}
            className="w-4 h-4"
          />
          <label
            htmlFor="is_public "
            className="text-sm dark:text-titleColor-dark "
          >
            Is Public
          </label>
        </div>

        <button
          type="button"
          onClick={handleSave}
          disabled={isLoading}
          className="bg-[#00113F] text-white dark:bg-background-cardDark w-[179px] h-[44px]  rounded-lg font-bold px-4 py-2 disabled:opacity-50"
        >
          {isLoading ? "Saving..." : "Save"}
        </button>
      </div>
    </section>
  );
};

export default WorkSpaceAddEdit;
