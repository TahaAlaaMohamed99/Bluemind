import { useState } from "react";

const useFileUpload = (accessToken, endPoint, onLogout) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (file) => {
    if (!file) {
      alert("Please select a file first!");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const formData = new FormData();
      formData.append("csv_file", file);

      const response = await fetch(`http://54.235.109.101/${endPoint}/`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          // الأفضل تشيل الـ Cookie لو مش محتاجها
        },
        body: formData,
      });

      if (response.status === 401) {
        // لو فيه دالة logout جايه من برا نستخدمها
        if (onLogout) {
          onLogout();
        } else {
          // fallback: امسح البيانات وروّح login
          localStorage.removeItem("accessToken");
          window.location.href = "/";
        }
        return;
      }

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const result = await response.json();
      setData(result);
      console.log("Success:", result);
    } catch (err) {
      console.log("Upload failed:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { handleSubmit, loading, data, error };
};

export default useFileUpload;
