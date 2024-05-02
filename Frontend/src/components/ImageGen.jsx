import axios from "axios";
import { useState } from "react";

const ImageGen = () => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };
  const handleGenerate = async (e) => {
    e.preventDefault();
    try {
      console.log(file);
      const formData = new FormData();
      formData.append("file", file);
      console.log(formData.getAll("file"));
      const result = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(result.data);
      setFile(null);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <form
      action="POST"
      encType="multipart/form-data"
      onSubmit={(e) => handleGenerate(e)}
    >
      <input type="file" name="file" onChange={handleFileChange} id="inp" />
      <button className="btn">Generate </button>
    </form>
  );
};

export default ImageGen;
