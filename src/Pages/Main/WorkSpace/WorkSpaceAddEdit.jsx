import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  resetBreadcrumb,
  setBreadcrumb,
} from "../../../Store/slices/layout-slice";
import { useDispatch } from "react-redux";

const WorkSpaceAddEdit = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  console.log(id);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    is_public: false,
  });
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

  const handleChange = (e) => {
    const { name, type, value, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSave = async () => {
    if (!formData.name || !formData.description) {
      alert("Please fill in all fields!");
      return;
    }

    try {
      setIsLoading(true);

      const accessToken = localStorage.getItem("accessToken");

      const response = await fetch(
        id === "add"
          ? "http://54.235.109.101/workspace/workspaces/"
          : `http://54.235.109.101/workspace/workspaces/${id}/`,
        {
          method: id === "add" ? "POST" : "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.status === 401) {
        // في حالة انتهاء الجلسة
        localStorage.removeItem("accessToken");
        window.location.href = "/";
        return;
      }

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const result = await response.json();
      console.log("Workspace saved:", result);

      navigate("/workspace");
    } catch (error) {
      console.error("Error saving workspace:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="main-section dark:bg-background-dark">
      <div className="border-2  border-border-light p-5 space-y-4 rounded-lg w-[400px]">
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
            className="border-2 focus:border-primary focus:outline-none w-full  border-border-light rounded-lg p-2 block"
          />
        </div>

        <div>
          <label
            className="block mb-1 dark:text-titleColor-dark dark:bg-background-cardDark"
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
            className="border-2  focus:border-primary dark:bg-background-cardDark focus:outline-none w-full border-border-light rounded-lg p-2 block"
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
            htmlFor="is_public dark:text-titleColor-dark"
            className="text-sm"
          >
            Is Public
          </label>
        </div>

        <button
          type="button"
          onClick={handleSave}
          disabled={isLoading}
          className="bg-[#AFAFAF] w-full rounded-lg font-bold px-4 py-2 disabled:opacity-50"
        >
          {isLoading ? "Saving..." : "Save"}
        </button>
      </div>
    </section>
  );
};

export default WorkSpaceAddEdit;
