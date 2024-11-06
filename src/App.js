import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import PropertyList from "./components/PropertyList";
import AddPropertyPage from "./pages/AddPropertyPage";
import PropertyFilter from "./components/PropertyFilter";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import db from "./FirebaseConfig"; // Firestore configuration
import { collection, getDocs } from "firebase/firestore"; // Firestore functions

function App() {
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [error, setError] = useState(null);
  const [availableOptions, setAvailableOptions] = useState({
    types: [],
    locations: [],
    bedrooms: [],
    bathrooms: []
  });

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const snapshot = await getDocs(collection(db, "properties"));
        const propertiesData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setProperties(propertiesData);
        setFilteredProperties(propertiesData); // Show all properties initially

        // Populate availableOptions based on fetched properties
        const types = [...new Set(propertiesData.map(prop => prop.type))];
        const locations = [...new Set(propertiesData.map(prop => prop.location))];
        const bedrooms = [...new Set(propertiesData.map(prop => prop.bedrooms))].sort();
        const bathrooms = [...new Set(propertiesData.map(prop => prop.bathrooms))].sort();
        
        setAvailableOptions({
          types,
          locations,
          bedrooms,
          bathrooms
        });
      } catch (err) {
        console.error("Error fetching properties:", err);
      }
    };
    fetchProperties();
  }, []);

  const handleFilter = (filterCriteria) => {
    const filtered = properties.filter((property) => {
      const matchesType = !filterCriteria.type || property.type === filterCriteria.type;
      const matchesLocation = !filterCriteria.location || property.location === filterCriteria.location;
      const matchesBedrooms = !filterCriteria.bedrooms || property.bedrooms === parseInt(filterCriteria.bedrooms, 10);
      const matchesBathrooms = !filterCriteria.bathrooms || property.bathrooms === parseInt(filterCriteria.bathrooms, 10);
      const matchesMinPrice = !filterCriteria.minPrice || property.price >= parseFloat(filterCriteria.minPrice);
      const matchesMaxPrice = !filterCriteria.maxPrice || property.price <= parseFloat(filterCriteria.maxPrice);

      return (
        matchesType &&
        matchesLocation &&
        matchesBedrooms &&
        matchesBathrooms &&
        matchesMinPrice &&
        matchesMaxPrice
      );
    });

    if (filtered.length > 0) {
      setFilteredProperties(filtered);
      setError(null);
    } else {
      setFilteredProperties([]);
      setError("No properties found matching the search criteria.");
    }
  };

  const handlePropertyAdded = (newProperty) => {
    setProperties(prevProperties => [...prevProperties, newProperty]);
    setFilteredProperties(prevProperties => [...prevProperties, newProperty]);
  };

  return (
    <Router>
      <div className="App">
        <header className="header">
          <h1>Real Estate Listings</h1>
          <nav>
            <Link to="/" className="btn btn-outline-primary mx-2">Home</Link>
            <Link to="/add-property" className="btn btn-outline-success mx-2">Add New Property</Link>
          </nav>
        </header>
        <div className="container my-4">
          <Routes>
            <Route path="/" element={
              <>
                <PropertyFilter onFilter={handleFilter} availableOptions={availableOptions} />
                {error && <div className="alert alert-danger">{error}</div>}
                <PropertyList properties={filteredProperties} />
              </>
            } />
            <Route path="/add-property" element={<AddPropertyPage onPropertyAdded={handlePropertyAdded} />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
