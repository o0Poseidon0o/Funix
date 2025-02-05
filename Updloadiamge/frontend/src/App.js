import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const [image, setImage] = useState(null);
  const [images, setImages] = useState([]);

  const fetchImages = async () => {
    try {
      const response = await axios.get("http://localhost:5000/images");
      setImages(response.data);
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const handleImageUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", image);

    try {
      await axios.post("http://localhost:5000/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success("Image uploaded successfully!");
      fetchImages();
    } catch (error) {
      console.error("Error uploading image:", error);
      toast.error("Failed to upload image");
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Image Upload</h1>
      <form onSubmit={handleImageUpload} className="my-4">
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
        />
        <button type="submit" className="ml-2 p-2 bg-blue-500 text-white rounded">
          Upload
        </button>
      </form>
      <ToastContainer />
      <div className="grid grid-cols-3 gap-4">
        {images.map((img) => (
          <div key={img.id} className="border p-2">
            <img src={`http://localhost:5000${img.filepath}`} alt={img.filename} className="w-full h-auto" />
            <p className="text-center mt-2">{img.filename}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
