import { useEffect, useState } from "react";

function useLocalStorageState(initialState, key) {
  const [cities, setCities] = useState(function () {
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : initialState;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(cities));
  }, [cities, key]);

  return [cities, setCities];
}

export default useLocalStorageState;
