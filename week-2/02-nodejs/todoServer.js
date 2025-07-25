/**
  You need to create an express HTTP server in Node.js which will handle the logic of a todo list app.
  - Don't use any database, just store all the data in an array to store the todo list data (in-memory)
  - Hard todo: Try to save responses in files, so that even if u exit the app and run it again, the data remains (similar to databases)

  Each todo has a title and a description. The title is a string and the description is a string.
  Each todo should also get an unique autogenerated id every time it is created
  The expected API endpoints are defined below,
  1.GET /todos - Retrieve all todo items
    Description: Returns a list of all todo items.
    Response: 200 OK with an array of todo items in JSON format.
    Example: GET http://localhost:3000/todos
    
  2.GET /todos/:id - Retrieve a specific todo item by ID
    Description: Returns a specific todo item identified by its ID.
    Response: 200 OK with the todo item in JSON format if found, or 404 Not Found if not found.
    Example: GET http://localhost:3000/todos/123
    
  3. POST /todos - Create a new todo item
    Description: Creates a new todo item.
    Request Body: JSON object representing the todo item.
    Response: 201 Created with the ID of the created todo item in JSON format. eg: {id: 1}
    Example: POST http://localhost:3000/todos
    Request Body: { "title": "Buy groceries", "completed": false, description: "I should buy groceries" }
    
  4. PUT /todos/:id - Update an existing todo item by ID
    Description: Updates an existing todo item identified by its ID.
    Request Body: JSON object representing the updated todo item.
    Response: 200 OK if the todo item was found and updated, or 404 Not Found if not found.
    Example: PUT http://localhost:3000/todos/123
    Request Body: { "title": "Buy groceries", "completed": true }
    
  5. DELETE /todos/:id - Delete a todo item by ID
    Description: Deletes a todo item identified by its ID.
    Response: 200 OK if the todo item was found and deleted, or 404 Not Found if not found.
    Example: DELETE http://localhost:3000/todos/123

    - For any other route not defined in the server return 404

  Testing the server - run `npm run test-todoServer` command in terminal
 */
  const express = require('express');
  const {v1 : v1uuid} = require('uuid');
  const fs = require("fs").promises;
  const bodyParser = require('body-parser');
  
  const app = express();
  const filePath = './files/todo_data.json';
  
  app.use(bodyParser.json());
  app.use(express.json())

  /*GET /todos - Retrieve all todo items
    Description: Returns a list of all todo items.
    Response: 200 OK with an array of todo items in JSON format.
    Example: GET http://localhost:3000/todos
  */

  app.get("/todos", async (req, res) => {
    try {
      const data = await fs.readFile(filePath, 'utf-8');
      const todos = JSON.parse(data)
      res.status(200).json(todos)
    }
    catch {
      res.status(500).json({ msg : "unable to fetch data"});
    }
  })

  /*2.GET /todos/:id - Retrieve a specific todo item by ID
    Description: Returns a specific todo item identified by its ID.
    Response: 200 OK with the todo item in JSON format if found, or 404 Not Found if not found.
    Example: GET http://localhost:3000/todos/123
    
  */

  app.get("/todos/:id", async (req, res) => {
    try {
      const id = req.params.id
      const data = await fs.readFile(filePath, "utf-8");
      const todos = JSON.parse(data)
      const user_data = todos.find(t => t.id === id)
      res.status(200).json(user_data)
    }
    catch {
      res.status(404).json({msg : "data not found"})
    }
  })

/*3. POST /todos - Create a new todo item
    Description: Creates a new todo item.
    Request Body: JSON object representing the todo item.
    Response: 201 Created with the ID of the created todo item in JSON format. eg: {id: 1}
    Example: POST http://localhost:3000/todos
    Request Body: { "title": "Buy groceries", "completed": false, description: "I should buy groceries" }
    */
   
  app.post("/todos", async (req, res) => {
    try {
      const todo = {
        id : uuidv1(),
        title : req.body.title,
        description : req.body.description,
        completed : false
      }
      const data = await fs.readFile(filePath, 'utf-8')
      const json_data = JSON.parse(data)

      json_data.push(todo)

      await fs.writeFile(filePath, JSON.stringify(json_data));
      
      res.status(201).json({msg : "created todo sucessfully"})
    }
    catch {
      res.status(404).json({msg : "there was error writing your data"})
    }
  })

  /* 4. PUT /todos/:id - Update an existing todo item by ID
    Description: Updates an existing todo item identified by its ID.
    Request Body: JSON object representing the updated todo item.
    Response: 200 OK if the todo item was found and updated, or 404 Not Found if not found.
    Example: PUT http://localhost:3000/todos/123
    Request Body: { "title": "Buy groceries", "completed": true }

  */

  app.put("/todos/:id", async (req, res) => {
    try {
      const id = req.params.id
      data = await fs.readFile("/files/todo_data.json");
      todos = JSON.parse(data)
      userIndex = todos.findIndex(t => t.id === id)

      if (user_index == -1) {
        res.status(404).json({msg : "user not found"})
      }

      updated_data = req.body;
      user_data = todos[userIndex]
      todos[userIndex] = [...user_data, ...updated_data]
      await fs.writeFile(filePath, JSON.stringify(todos));
      res.status(200).json({ msg: "Todo updated successfully" });

    } catch {
       res.status(404).json({msg : "there was error updating your data"})
    }

  })

/*
5. DELETE /todos/:id - Delete a todo item by ID
    Description: Deletes a todo item identified by its ID.
    Response: 200 OK if the todo item was found and deleted, or 404 Not Found if not found.
    Example: DELETE http://localhost:3000/todos/123

*/

app.delete("/todos/:id", async (req, res) => {
  try {
    const id = req.params.id
    data = await fs.readFile(filePath, 'utf-8');
    todos = JSON.parse(data)
    user_index = todos.findIndex(t => t.id === id)
    if (user_index == -1) {
      res.status(404).json({msg : "user not found"})
    }
    todos.splice(user_index, 1)
    await fs.writeFile(filePath, JSON.stringify(todos))

    res.status(200).json({msg : "todo deleted sucessfully"})
    } catch {
    res.status(404).json({msg : "there was error deleting todo"})
  }
})

app.use((req, res, next) => {
  res.status(404).send();
});
  
  module.exports = app;