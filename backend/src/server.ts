import express from "express";
import cors from "cors";
import { sampleFoods, sampleTags, sampleUsers } from "./data";
import Jwt from "jsonwebtoken";

const app = express();
app.use(express.json());

app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:4200"],
  })
);

app.get("/api/foods", (req, res) => {
  res.send(sampleFoods);
});

app.get("/api/foods/search/:searchTerm", (req, res) => {
  const searchTerm = req.params.searchTerm;
  const foods = sampleFoods.filter((food) =>
    food.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  res.send(foods);
});

app.get("/api/foods/tags", (req, res) => {
  res.send(sampleTags);
});

app.get("/api/foods/tag/:tagName", (req, res) => {
  const tagName = req.params.tagName;
  const foods = sampleFoods.filter((food) => food.tags?.includes(tagName));
  res.send(foods);
});

app.get("/api/foods/:foodId", (req, res) => {
  const foodId = req.params.foodId;
  const foods = sampleFoods.find((food) => food.id == foodId)!;
  res.send(foods);
});

app.post("/api/users/login", (req, res) => {
  // const body = req.body;
  const { email, password } = req.body; // we've deconstructing assignment.
  const user = sampleUsers.find((user) => {
    return user.email == email && user.password == password;
  });

  user
    ? res.send(generateTokenResponse(user))
    : res.status(400).send("Email or Password is invalid");
});

const generateTokenResponse = (user: any) => {
  const token = Jwt.sign(
    { email: user.email, isAdmin: user.isAdmin },
    "ThisIsMyPrivateKey",
    { expiresIn: "30d" }
  );
  user.token = token;
  return user;
};

const port = 5000;
app.listen(port, () => {
  console.log("Website served on http://localhost:" + port);
});
