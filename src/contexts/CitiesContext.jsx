import { createContext, useContext, useEffect, useState } from "react";

const CityContext = createContext();

function CitiesProvider({ children }) {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    async function fetchCities() {
      try {
        setIsLoading(true);
        const res = await fetch("http://localhost:8000/cities");
        const data = await res.json();
        setCities(data);
      } catch (e) {
        alert("There was an error loading data...");
      } finally {
        setIsLoading(false);
      }
    }
    fetchCities();
  }, []);

  return (
    <CityContext.Provider value={{ cities, isLoading }}>
      {children}
    </CityContext.Provider>
  );
}

function useCities() {
  const value = useContext(CityContext);
  if (value === undefined) {
    throw new Error("Context is used outside of Context API !");
  }
  return value;
}

export { useCities, CitiesProvider };
