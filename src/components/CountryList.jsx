import CountryItem from "./CountryItem";
import Message from "./Message";
import styles from "./CountryList.module.css";
import Spinner from "./Spinner";

function CountriesList({ cities, isLoading }) {
  if (isLoading) {
    return <Spinner />;
  }

  // const countries = cities.reduce((arr, city) => {
  //   if (!arr.map((el) => el.country).includes(city.country)) {
  //     return [...arr, { country: city.country, emoji: city.emoji }];
  //   } else {
  //     return arr;
  //   }
  // }, []);

  const countries = cities.map(({ country, emoji }) => ({ country, emoji }));
  console.log(countries);

  if (!cities.length) {
    return (
      <Message message="Add your first city by selecting a city on the Map" />
    );
  }

  return (
    <ul className={styles.countryList}>
      {countries.map((country) => (
        <CountryItem country={country} key={country.country} />
      ))}
    </ul>
  );
}

export default CountriesList;
