import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

let cities = [];

// Get CITIES
app.get("/cities", (req, res) => {
  try {
    res.status(200).json(cities);
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Some error occurred !" });
  }
});

// ADD NEW CITIES
app.post("/cities", (req, res) => {
  try {
    cities.push(req.body);
    res.status(200).json(req.body);
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Some error occurred !" });
  }
});

// GET SPECIFIC CITY
app.get("/cities/:id", (req, res) => {
  try {
    const { id } = req.params;
    const specificCity = cities.filter((city) => (city.id == id ? city : null));
    res.status(200).json(specificCity);
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Some error occurred !" });
  }
});

// DELETE SPECIFIC CITY
app.delete("/cities/:id", (req, res) => {
  try {
    const { id } = req.params;
    const newCities = cities.filter((city) => city.id != id);
    cities = newCities;
    res.sendStatus(204);
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Some error occurred !" });
  }
});

app.listen(3000, () => console.log("Server is running on port 3000 !"));
