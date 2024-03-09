import { createContext, useContext, useEffect, useState } from "react";

const CityContext = createContext();

function CitiesProvider({ children }) {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [curCity, setCurCity] = useState({});
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

  async function getCity(id) {
    try {
      setIsLoading(true);
      const res = await fetch(`http://localhost:8000/cities/${id}`);
      const data = await res.json();
      setCurCity(data);
    } catch (e) {
      alert("There was an error loading data...");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <CityContext.Provider value={{ cities, isLoading, curCity, getCity }}>
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
