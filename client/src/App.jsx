import axios from "axios";
import { useState } from "react";

function App() {
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");

  const handleChange = (event) => {
    setImage(event.target.files[0]);
  };

  const SubmitImageUpload = async (e) => {
    e.preventDefault();

    console.log(image);
    const formData = new FormData();
    formData.append("image", image);

    try {
      const res = await axios.post("http://localhost:5500/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setImageUrl(res.data.url);
    } catch (err) {
      console.error("Error uploading image:", err);
    }
  };

  return (
    <div>
      <h1>Upload Image avec Cloudinary</h1>
      <input
        type="file"
        name="image"
        accept="image/*"
        onChange={handleChange}
      />
      {imageUrl && (
        <img src={imageUrl} alt="Uploaded" style={{ maxWidth: "100%" }} />
      )}
      <button onClick={SubmitImageUpload}>Send file</button>
    </div>
  );
}

export default App;
