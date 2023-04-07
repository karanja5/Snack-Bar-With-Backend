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

router.get("/:tagName", (req, res) => {
  const tagName = req.params.tagName;
  const foods = sampleFoods.filter((food) => food.tags?.includes(tagName));
  res.send(foods);
});

router.get("/api/foods/:foodId", (req, res) => {
  const foodId = req.params.foodId;
  const foods = sampleFoods.find((food) => food.id == foodId)!;
  res.send(foods);
});

export default router;
