const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/Fetchuser");
const Todo = require("../models/Todo");
const { body, validationResult } = require("express-validator");


router.post(
    "/addTodo",
    fetchuser,
    [
      
      body("title", "Title must be atleast 3 characters...").isLength(
        { min: 3 }
      ),
      body("task", "Enter a Valid Task").isLength({ min: 3 })
    ],
    async (req, res) => {
      try {
        const { title, task,isComplete } = req.body;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
  
        const todo = new Todo({
          title,
          task,
          isComplete,
          user: req.user.id,
        });
        const saveTodo = await todo.save();
        res.json(saveTodo);
      } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
      }
    }
  );



  router.put(
    "/updateTodo/:id",
    fetchuser,
    [
      body("title", "Enter a Valid Title").isLength({ min: 3 }),
      body("task", "Task must be atleast 5 characters...").isLength(
        { min: 5 }
      ),
    ],
    async (req, res) => {
      try {
        const { title, task, isComplete } = req.body;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
  
        const newTodo = {};
        if(title){newTodo.title=title}
        if(task){newTodo.task=task}
        if(isComplete){newTodo.isComplete=isComplete}
  
  
        //find the note by id
        let todo= await Todo.findById(req.params.id);
        if(!todo)
        {
            res.status(404).send("Not Found")
        }
        if(todo.user.toString() !==req.user.id){
            return res.status(401).send("Not allowed");
        }
  
       todo = await Todo.findByIdAndUpdate(req.params.id,{$set:newTodo},{new:true})
       res.json({todo})
      } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
      }
    }
  );

  

router.delete(
    "/deleteTodo/:id",
    fetchuser,
    async (req, res) => {
      try {

        //find the note by delete 
        let todo= await Todo.findById(req.params.id);
        if(!todo)
        {
            res.status(404).send("Not Found")
        }

        // allow deletion 

        if(todo.user.toString() !==req.user.id){
            return res.status(401).send("Not allowed");
        }

  
        todo = await Todo.findByIdAndDelete(req.params.id)
       res.json({"success":"deleted Todo"})
      } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
      }
    }
  );


router.get("/fetchAllTodo", fetchuser, async (req, res) => {
    const todo = await Todo.find({ user: req.user.id });
    res.json(todo);
  });
module.exports = router;