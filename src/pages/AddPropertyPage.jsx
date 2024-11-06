// src/pages/AddPropertyPage.js
import React from "react";
import AddPropertyForm from "../components/AddPropertyForm";

const AddPropertyPage = ({ onPropertyAdded }) => {
  return (
    <div>
      <h2>Add New Property</h2>
      <AddPropertyForm onPropertyAdded={onPropertyAdded} />
    </div>
  );
};

export default AddPropertyPage;
