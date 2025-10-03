const express = require("express");
const router = express.Router();

const ideas = [
  {
    id: 1,
    text: "Random Idea 1",
    tag: "Technology",
    username: "AbdullahAbde",
    date: "2025-10-03",
  },
  {
    id: 2,
    text: "Random Idea 2",
    tag: "Inventions",
    username: "SteveRogers",
    date: "2025-10-04",
  },
  {
    id: 3,
    text: "Random Idea 3",
    tag: "Software",
    username: "TonyStark",
    date: "2025-10-05",
  },
];

// Get all ideas
router.get("/", (req, res) => {
  res.json({ success: true, data: ideas });
});

// Get single idea by ID
router.get("/:id", (req, res) => {
  const idea = ideas.find((i) => i.id === parseInt(req.params.id));

  if (!idea) {
    return res
      .status(404)
      .json({ success: false, error: "Resource not found" });
  }

  res.json({ success: true, data: idea });
});

module.exports = router;
