/* Importing the `Router` class from the `express` module. The `Router` class is used to create
modular, mountable route handlers for a web application. */
/* `Router` is a class from the `express` module that is used to create modular, mountable
route handlers for a web application. It allows us to define routes for different HTTP
methods (such as GET, POST, PUT, DELETE) and handle requests to those routes with
corresponding functions. In this code, `Router` is used to define routes for a food-related
web application, such as getting a list of foods, searching for foods by name, getting a
list of tags, and getting a list of foods with a specific tag. */
import { Router } from "express";
// import { sampleFoods } from "../data/sample-foods"; //I don't need this anymore because I have seeded the database
import asyncHandler from "express-async-handler";
import { FoodModel } from "../models/food.model";

const router = Router();

// router.get(
//   "/seed",
//   asyncHandler(async (req, res) => {
//     const foodsCount = await FoodModel.countDocuments();
//     if (foodsCount > 0) {
//       res.send("Foods already seeded");
//       return;
//     }
//     await FoodModel.create(sampleFoods);
//     res.send("Foods seeded");
//   })
// );
//I have already seeded the database so I don't need to seed it again

router.get(
  "/",
  asyncHandler(async (req, res) => {
    const foods = await FoodModel.find();
    res.send(foods);
  })
);

/* This code defines a route for searching foods by name. It listens for GET requests to the
"/search/:searchTerm" endpoint, where ":searchTerm" is a dynamic parameter that can be any string.
When a request is received, it creates a regular expression using the search term provided in the
URL parameter, and uses it to search for foods in the database using the FoodModel. It then sends
the list of matching foods as a response to the client. */
router.get(
  "/search/:searchTerm",
  asyncHandler(async (req, res) => {
    const searchRegex = new RegExp(req.params.searchTerm, "i");
    const foods = await FoodModel.find({
      name: { $regex: searchRegex },
    });
    res.send(foods);
  })
);

/* This code defines a route for getting a list of tags for the food items in the database. It listens
for GET requests to the "/tags" endpoint. When a request is received, it uses the FoodModel to
aggregate the tags for all the food items in the database. It then sorts the tags by the number of
food items that have each tag, and sends the list of tags and their counts as a response to the
client. The "All" tag is also added to the beginning of the list with the count of all the food
items in the database. */
router.get(
  "/tags",
  asyncHandler(async (req, res) => {
    const tags = await FoodModel.aggregate([
      {
        $unwind: "$tags",
      },
      {
        $group: {
          _id: "$tags",
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          name: "$_id",
          count: "$count",
        },
      },
    ]).sort({ count: -1 });
    const all = {
      name: "All",
      count: await FoodModel.countDocuments(),
    };
    tags.unshift(all);
    res.send(tags);
  })
);

router.get(
  "/tag/:tagName",
  asyncHandler(async (req, res) => {
    const foods = await FoodModel.find({
      tags: req.params.tagName,
    });
    res.send(foods);
  })
);

router.get(
  "/:foodId",
  asyncHandler(async (req, res) => {
    const food = await FoodModel.findById(req.params.foodId);
    res.send(food);
  })
);

/* `export default router;` is exporting the `router` object as the default export of the module. This
allows other modules to import the router object using `import router from './router'` syntax. */
export default router;
