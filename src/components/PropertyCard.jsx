// src/components/PropertyCard.jsx
import React from "react";
import "./PropertyCard.css";

const PropertyCard = ({ property }) => {
  return (
    <div className="property-card">
      <div className="property-details">
        <h3>{property.name}</h3>
        <p className="property-location">
          <i className="fas fa-map-marker-alt"></i> {property.location}
        </p>
        <p className="property-price">
          <i className="fas fa-dollar-sign"></i> {property.price.toLocaleString()} USD
        </p>
        <p className="property-type">
          <strong>Type:</strong> {property.type}
        </p>
        <p className="property-area">
          <i className="fas fa-expand"></i> {property.area} m<sup>2</sup>
        </p>
        <p className="property-bedrooms">
          <i className="fas fa-bed"></i> Bedrooms: {property.bedrooms}
        </p>
        <p className="property-bathrooms">
          <i className="fas fa-bath"></i> Bathrooms: {property.bathrooms}
        </p>
        <div className="property-amenities">
          <strong>Amenities:</strong>
          <ul>
            {property.amenities.map((amenity, index) => (
              <li key={index}>{amenity}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
