const express = require("express")
const mongoose = require('mongoose')
const cors = require('cors')

const app = express()
app.use(express.json())
app.use(cors())
const PORT = 8080
const mongoUri = 'mongodb://root:example@localhost:27017/';

// Defining mongodb Model and Schema
const TodoSchema = mongoose.Schema({
  text: {
    type: String,
    required: true
  },
  completed: {
    type: Boolean,
    default: false
  }
})

const Todo = mongoose.model("Todo", TodoSchema)

// test route
app.get("/hello", (req, res) => {
  res.status(200).json({ message: "Hello friend" })
  return
})

// Get route for todos
app.get("/todos/get", async (req, res) => {
  try {
    const todos = await Todo.find()
    console.log(todos)
    res.status(200).json({ todos: todos })
    return
  } catch (error) {
    console.error(error)
    return
  }
})

app.put("/todos/complete/:id", async (req, res) => {
  try {
    const todoId = req.params.id
    const updatedTodo = await Todo.findByIdAndUpdate(todoId, { completed: true }, { new: true })
    if (!updatedTodo) {
      res.status(400).send("Todo not found")
    }

    console.log("Todo completed")
    res.status(200).json({ message: "Todo Completed" })
    return
  } catch (error) {
    console.error(error)
    res.status(500).send("Error updating the Todo")
    return
  }
})

// Post route for Todos
app.post("/todos/create", async (req, res) => {
  try {
    const todo = new Todo(req.body)
    console.log(todo)
    await todo.save()
    console.log("todo created")
    res.status(200).json({ todos: todo })
    return
  } catch (error) {
    res.status(400).send("Adding new Todo failed")
    return
  }
})

// TODO: Add the update feature to mark todos completed

async function startApp() {
  mongoose.connect(mongoUri)
  console.log("connected to mongodb")

  app.listen(PORT, () => {
    console.log("App listening to port 8080")
  })
}

startApp()
