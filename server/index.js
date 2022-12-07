import express from "express";
import cors from "cors";

//initialize the epxress app
const app = express();
app.use(cors());
app.use(express.json());

//use chance library to create fake data (about animals)
import Chance from "chance";
const chance = new Chance();

const animals = [...Array(250).keys()].map((id) => {
  return {
    id,
    type: chance.animal(),
    age: chance.age(),
    name: chance.name(),
  };
});

//Endpoint to search for animals
app.get("animals", (req, res) => {
  //filter results by query
  //q represents what user is trying to search
  const q = req.query.q?.toLowerCase() || "";
  const results = animals.filter((animal) =>
    animal.type.toLowerCase().includes(q)
  );

  res.send(results);
});

app.listen(8080, () => console.log("Listening on http://localhost:8080"));