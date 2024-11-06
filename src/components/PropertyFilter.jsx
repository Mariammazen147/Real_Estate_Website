import React, { useState } from "react";

const PropertyFilter = ({ onFilter, availableOptions = { types: [], locations: [], bedrooms: [], bathrooms: [] } }) => {
  const [filterCriteria, setFilterCriteria] = useState({
    type: "",
    location: "",
    bedrooms: "",
    bathrooms: "",
    minPrice: "",
    maxPrice: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilterCriteria({ ...filterCriteria, [name]: value });
  };

  const handleFilter = (e) => {
    e.preventDefault();
    onFilter(filterCriteria);
  };

  return (
    <form className="property-filter mb-4" onSubmit={handleFilter}>
      <div className="form-group">
        <label>Type</label>
        <select
          name="type"
          value={filterCriteria.type}
          onChange={handleChange}
          className="form-control"
        >
          <option value="">Any</option>
          {availableOptions.types.map((type) => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label>Location</label>
        <select
          name="location"
          value={filterCriteria.location}
          onChange={handleChange}
          className="form-control"
        >
          <option value="">Any</option>
          {availableOptions.locations.map((location) => (
            <option key={location} value={location}>{location}</option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label>Bedrooms</label>
        <select
          name="bedrooms"
          value={filterCriteria.bedrooms}
          onChange={handleChange}
          className="form-control"
        >
          <option value="">Any</option>
          {availableOptions.bedrooms.map((bedroom) => (
            <option key={bedroom} value={bedroom}>{bedroom}</option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label>Bathrooms</label>
        <select
          name="bathrooms"
          value={filterCriteria.bathrooms}
          onChange={handleChange}
          className="form-control"
        >
          <option value="">Any</option>
          {availableOptions.bathrooms.map((bathroom) => (
            <option key={bathroom} value={bathroom}>{bathroom}</option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label>Price Range</label>
        <div className="price-range">
          <input
            type="number"
            name="minPrice"
            value={filterCriteria.minPrice}
            onChange={handleChange}
            className="form-control"
            placeholder="Min"
          />
          <input
            type="number"
            name="maxPrice"
            value={filterCriteria.maxPrice}
            onChange={handleChange}
            className="form-control"
            placeholder="Max"
          />
        </div>
      </div>

      <button type="submit" className="btn btn-secondary mt-3">Filter</button>
    </form>
  );
};

export default PropertyFilter;
