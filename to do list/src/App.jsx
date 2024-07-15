import React, { useState, useEffect } from 'react';
import { FaTrashAlt, FaCheck, FaEdit } from 'react-icons/fa';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [input, setInput] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('Low');
  const [deadline, setDeadline] = useState('');

  useEffect(() => {
    if (editIndex !== null) {
      const todo = todos.find(todo => todo.id === editIndex);
      if (todo) {
        setInput(todo.text);
        setDescription(todo.description);
        setPriority(todo.priority);
        setDeadline(todo.deadline);
      }
    }
  }, [editIndex, todos]);

  const addTodo = (todo) => {
    setTodos([...todos, { ...todo, id: Date.now() }]);
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(todo => todo.id === id ? { ...todo, completed: !todo.completed } : todo));
  };

  const updateTodo = (id, updatedTodo) => {
    setTodos(todos.map(todo => todo.id === id ? updatedTodo : todo));
    setEditIndex(null);
  };

  const handleDoubleClick = (id) => {
    toggleTodo(id);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      if (editIndex !== null) {
        updateTodo(editIndex, {
          id: editIndex,
          text: input,
          description,
          priority,
          deadline,
          completed: false,
        });
      } else {
        addTodo({
          id: Date.now(),
          text: input,
          description,
          priority,
          deadline,
          completed: false,
        });
      }
      setInput('');
      setDescription('');
      setPriority('Low');
      setDeadline('');
    }
  };

  const getSortedTodos = () => {
    return todos.slice().sort((a, b) => {
      const priorityOrder = { High: 1, Medium: 2, Low: 3 };
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    });
  };

  return (
    <div className="app-container">
      <div className="app">
        <h1 className="title"><strong>To-Do List</strong></h1>
        <form className="todo-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter a new task"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <input
            type="text"
            placeholder="Enter task description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <select value={priority} onChange={(e) => setPriority(e.target.value)}>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
          <input
            type="date"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
          />
          <button type="submit">{editIndex !== null ? 'Update' : 'Submit'}</button>
        </form>
        <table className="todo-list">
          <thead>
            <tr>
              <th>S.No.</th>
              <th>Task</th>
              <th>Description</th>
              <th>Priority</th>
              <th>Deadline</th>
              <th>Edit</th>
              <th>Done</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {getSortedTodos().map((todo, index) => (
              <tr
                key={todo.id}
                className={`todo-item ${todo.completed ? 'completed' : ''}`}
                onDoubleClick={() => handleDoubleClick(todo.id)}
              >
                <td>{index + 1}</td>
                <td onMouseDown={(e) => e.preventDefault()}>{todo.text}</td>
                <td onMouseDown={(e) => e.preventDefault()}>{todo.description}</td>
                <td className={`priority ${todo.priority.toLowerCase()}`}>{todo.priority}</td>
                <td>{todo.deadline}</td>
                <td><FaEdit onClick={() => setEditIndex(todo.id)} className="edit-icon" /></td>
                <td>{todo.completed && <FaCheck className="check-icon" />}</td>
                <td><FaTrashAlt onClick={() => deleteTodo(todo.id)} className="delete-icon" /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
