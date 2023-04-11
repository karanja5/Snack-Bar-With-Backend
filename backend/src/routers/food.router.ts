/* Importing the `Router` class from the `express` module. The `Router` class is used to create
modular, mountable route handlers for a web application. */
/* `Router` is a class from the `express` module that is used to create modular, mountable
route handlers for a web application. It allows us to define routes for different HTTP
methods (such as GET, POST, PUT, DELETE) and handle requests to those routes with
corresponding functions. In this code, `Router` is used to define routes for a food-related
web application, such as getting a list of foods, searching for foods by name, getting a
list of tags, and getting a list of foods with a specific tag. */
import { Router } from "express";
import { sampleFoods, sampleTags } from "../data";

const router = Router();

router.get("/", (req, res) => {
  res.send(sampleFoods);
});

router.get("/search/:searchTerm", (req, res) => {
  const searchTerm = req.params.searchTerm;
  const foods = sampleFoods.filter((food) =>
    food.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  res.send(foods);
});

router.get("/tags", (req, res) => {
  res.send(sampleTags);
});

router.get("/tag/:tagName", (req, res) => {
  const tagName = req.params.tagName;
  const foods = sampleFoods.filter((food) => food.tags?.includes(tagName));
  res.send(foods);
});

router.get("/:foodId", (req, res) => {
  const foodId = req.params.foodId;
  const foods = sampleFoods.find((food) => food.id == foodId)!;
  res.send(foods);
});

/* `export default router;` is exporting the `router` object as the default export of the module. This
allows other modules to import the router object using `import router from './router'` syntax. */
export default router;
