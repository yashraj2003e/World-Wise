import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
} from "react";
import useLocalStorageState from "../hooks/UseLocalStorageState";

const CityContext = createContext();

const initialState = {
  cities: [],
  isLoading: false,
  curCity: {},
  error: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return {
        ...state,
        isLoading: true,
      };
    case "cities/loaded":
      return {
        ...state,
        isLoading: false,
        cities: action.payload,
      };
    case "city/loaded":
      return { ...state, isLoading: false, curCity: action.payload };
    case "city/created":
      return {
        ...state,
        isLoading: false,
        cities: [...state.cities, action.payload],
        curCity: action.payload,
      };
    case "city/deleted":
      return {
        ...state,
        isLoading: false,
        cities: state.cities.filter((city) => city.id !== action.payload),
        curCity: {},
      };
    case "rejected":
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    default:
      throw new Error("Unknown action type !");
  }
}

function CitiesProvider({ children }) {
  const [{ cities, isLoading, curCity, error }, dispatch] = useReducer(
    reducer,
    initialState
  );

  console.log(cities);

  useEffect(() => {
    async function fetchCities() {
      dispatch({ type: "loading" });
      try {
        const res = await fetch("http://localhost:3000/cities");
        const data = await res.json();
        dispatch({ type: "cities/loaded", payload: data });
      } catch (e) {
        dispatch({
          type: "rejected",
          payload: "There was an error loading data...",
        });
      }
    }
    fetchCities();
  }, []);

  const getCity = useCallback(
    async function getCity(id) {
      if (Number(id) === curCity.id) return;

      dispatch({ type: "loading" });
      try {
        const res = await fetch(`http://localhost:3000/cities/${id}`);
        const data = await res.json();
        dispatch({ type: "city/loaded", payload: data });
      } catch (e) {
        dispatch({
          type: "rejected",
          payload: "There was an error loading cities...",
        });
      }
    },
    [curCity.id]
  );

  async function createCity(newCity) {
    dispatch({ type: "loading" });
    try {
      const res = await fetch(`http://localhost:3000/cities`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();
      console.log(data);
      dispatch({ type: "city/created", payload: data });
    } catch (e) {
      console.log(e);
      alert("There was an error loading data...");
    }
  }

  async function deleteCity(id) {
    dispatch({ type: "loading" });
    try {
      await fetch(`http://localhost:3000/cities/${id}`, {
        method: "DELETE",
      });
      console.log(id);
      dispatch({ type: "city/deleted", payload: id });
    } catch (e) {
      console.log(e);
      alert("There was an error deleting city...");
    }
  }

  return (
    <CityContext.Provider
      value={{
        cities,
        isLoading,
        curCity,
        error,
        getCity,
        createCity,
        deleteCity,
      }}
    >
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
