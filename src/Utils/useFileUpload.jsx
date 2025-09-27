import { useState } from "react";

const useFileUpload = (accessToken, endPoint) => {
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
          Cookie:
            "csrftoken=M30Y6s2zXMnH4OW7OOjv3xBs9gOZM1Kg; sessionid=8tt0uig05fyvoj66xo9qbjfwutuohbk5",
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const result = await response.json();
      setData(result);
      console.log("Success:", result);
      alert("File uploaded successfully!");
    } catch (err) {
      console.error("Upload failed:", err);
      setError(err.message);
      alert("Upload failed, please try again.");
    } finally {
      setLoading(false);
    }
  };

  return { handleSubmit, loading, data, error };
};

export default useFileUpload;
