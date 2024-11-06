// src/components/PropertyList.jsx
import React from "react";
import PropertyCard from "./PropertyCard";
import "./PropertyList.css";

const PropertyList = ({ properties }) => {
  if (!properties || properties.length === 0) {
    return <p className="no-properties-message">No properties found.</p>;
  }

  return (
    <div className="property-list">
      {properties.map((property) => (
        <PropertyCard key={property.id} property={property} />
      ))}
    </div>
  );
};

export default PropertyList;