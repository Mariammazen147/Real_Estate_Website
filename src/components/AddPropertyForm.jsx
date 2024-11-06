// src/components/AddPropertyForm.jsx
import React, { useState } from "react";
import db from "../FirebaseConfig";
import { collection, addDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const AddPropertyForm = ({ onPropertyAdded }) => {
  const [propertyData, setPropertyData] = useState({
    name: "",
    location: "",
    price: "",
    type: "",
    amenities: "",
    area: "",
    bedrooms: "",
    bathrooms: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPropertyData({ ...propertyData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const dataToSubmit = {
      ...propertyData,
      price: parseFloat(propertyData.price),
      area: parseFloat(propertyData.area),
      bedrooms: parseInt(propertyData.bedrooms, 10),
      bathrooms: parseInt(propertyData.bathrooms, 10),
      amenities: propertyData.amenities.split(","),
    };

    try {
      const docRef = await addDoc(collection(db, "properties"), dataToSubmit);
      const newProperty = { id: docRef.id, ...dataToSubmit };
      onPropertyAdded(newProperty); 
      navigate("/"); 
    } catch (error) {
      console.error("Error adding property:", error);
    }
  };

  return (
    <form className="add-property-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Name:</label>
        <input type="text" name="name" value={propertyData.name} onChange={handleChange} className="form-control" required />
      </div>
      <div className="form-group">
        <label>Location:</label>
        <input type="text" name="location" value={propertyData.location} onChange={handleChange} className="form-control" required />
      </div>
      <div className="form-group">
        <label>Price:</label>
        <input type="number" name="price" value={propertyData.price} onChange={handleChange} className="form-control" required />
      </div>
      <div className="form-group">
        <label>Type:</label>
        <input type="text" name="type" value={propertyData.type} onChange={handleChange} className="form-control" required />
      </div>
      <div className="form-group">
        <label>Area (m²):</label>
        <input type="number" name="area" value={propertyData.area} onChange={handleChange} className="form-control" required />
      </div>
      <div className="form-group">
        <label>Bedrooms:</label>
        <input type="number" name="bedrooms" value={propertyData.bedrooms} onChange={handleChange} className="form-control" required />
      </div>
      <div className="form-group">
        <label>Bathrooms:</label>
        <input type="number" name="bathrooms" value={propertyData.bathrooms} onChange={handleChange} className="form-control" required />
      </div>
      <div className="form-group">
        <label>Amenities (comma-separated):</label>
        <input type="text" name="amenities" value={propertyData.amenities} onChange={handleChange} className="form-control" required />
      </div>
      <button type="submit" className="btn btn-primary mt-3">Add Property</button>
    </form>
  );
};

export default AddPropertyForm;
