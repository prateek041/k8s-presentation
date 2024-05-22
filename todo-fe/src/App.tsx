import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Todo {
  _id: string;
  text: string;
  completed: boolean;
}

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState('');

  // Replace with the correct backend URL
  const backendUrl = import.meta.env.REACT_APP_BACKEND_URL || 'http://localhost:8080';

  useEffect(() => {
    const fetchTodos = async () => {
      const response = await axios.get(`${backendUrl}/todos/get`);
      console.log(response.data.todos)
      setTodos(response.data.todos);
    };

    fetchTodos();
  }, [backendUrl]);

  const addTodo = async () => {
    if (!newTodo.trim()) return;

    const response = await axios.post(`${backendUrl}/todos/create`, {
      text: newTodo,
      completed: false,
    });

    setTodos([...todos, response.data.todos]);
    setNewTodo('');
  };

  const completeTodo = async (id: string) => {
    console.log("this is the todoId", id)
    await axios.put(`${backendUrl}/todos/complete/${id}`);
    setTodos(
      todos.map(todo =>
        todo._id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  return (
    <div className="App">
      <h1>Todo List</h1>
      <input
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        placeholder="Add new todo"
      />
      <button onClick={addTodo}>Add Todo</button>
      <ul>
        {todos.map((todo) => (
          <li key={todo._id} style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
            {todo.text}
            <button onClick={() => completeTodo(todo._id)}>Complete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
