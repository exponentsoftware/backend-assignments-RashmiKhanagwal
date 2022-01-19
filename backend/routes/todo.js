const router = require("express").Router();
const Todo = require("../models/todo");

//CREATE TODO
router.post("/", async (req, res) => {
    const newTodo = new Todo(req.body);
    try {
      const savedTodo = await newTodo.save();
      res.status(200).json(savedTodo);
    } catch (err) {
      res.status(500).json(err);
    }
});

//GET TODO
router.get("/:id", async (req, res) => {
    try {
      const todo = await Todo.findById(req.params.id);
      res.status(200).json(todo);
    } catch (err) {
      res.status(500).json(err);
    }
});
  
//UPDATE POST
router.put("/:id", async (req, res) => {
    try {
      const todo = await Todo.findById(req.params.id);
      if (todo.username === req.body.username) {
        try {
          const updatedTodo = await Todo.findByIdAndUpdate(
            req.params.id,
            {
              $set: req.body,
            },
            { new: true }
          );
          res.status(200).json(updatedTodo);
        } catch (err) {
          res.status(500).json(err);
        }
      } else {
        res.status(401).json("You can update only your todo!");
      }
    } catch (err) {
      res.status(500).json(err);
    }
});
  
//DELETE POST
router.delete("/:id", async (req, res) => {
    try {
      const todo = await Todo.findById(req.params.id);
      if (todo.username === req.body.username) {
        try {
          await todo.delete();
          res.status(200).json("todo has been deleted...");
        } catch (err) {
          res.status(500).json(err);
        }
      } else {
        res.status(401).json("You can delete only your todo!");
      }
    } catch (err) {
      res.status(500).json(err);
    }
});

  
module.exports = router;