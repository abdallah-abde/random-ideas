const express = require("express");
const router = express.Router();
const Idea = require("../models/Idea");

// Get all ideas
router.get("/", async (req, res) => {
  try {
    const ideas = await Idea.find();
    res.json({ success: true, data: ideas });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: "Something went wrong" });
  }
});

// Get single idea by ID
router.get("/:id", async (req, res) => {
  try {
    const idea = await Idea.findById(req.params.id);

    res.json({ success: true, data: idea });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: "Something went wrong" });
  }
});

// Create new idea
router.post("/", async (req, res) => {
  const { text, tag, username } = req.body;

  const idea = new Idea({
    text,
    tag,
    username,
  });

  try {
    const savedIdea = await idea.save();
    res.status(201).json({ success: true, data: savedIdea });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: "Something went wrong" });
  }
});

// Update idea by ID
router.put("/:id", async (req, res) => {
  try {
    const idea = await Idea.findById(req.params.id);

    // Match the usernames
    if (idea.username === req.body.username) {
      const updatedIdea = await Idea.findByIdAndUpdate(
        req.params.id,
        {
          $set: {
            text: req.body.text,
            tag: req.body.tag,
          },
        },
        {
          new: true,
        }
      );

      return res.json({ success: true, data: updatedIdea });
    }

    // Usernames don't match
    return res
      .status(403)
      .json({
        success: false,
        error: "You are not authorized to update this resource",
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: "Something went wrong" });
  }
});

// Delete idea by ID
router.delete("/:id", async (req, res) => {
  try {
    const idea = await Idea.findById(req.params.id);

    // Match the usernames
    if (idea.username === req.body.username) {
      await Idea.findByIdAndDelete(req.params.id);
      return res.json({ success: true, data: {} });
    }

    // Usernames don't match
    return res
      .status(403)
      .json({
        success: false,
        error: "You are not authorized to delete this resource",
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: "Something went wrong" });
  }
});

module.exports = router;
