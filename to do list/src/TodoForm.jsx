import React, { useState, useEffect } from 'react';

function TodoForm({ addTodo, editIndex, todos, updateTodo }) {
  const [input, setInput] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('Low');
  const [deadline, setDeadline] = useState('');

  useEffect(() => {
    if (editIndex !== null) {
      const todo = todos[editIndex];
      setInput(todo.text);
      setDescription(todo.description);
      setPriority(todo.priority);
      setDeadline(todo.deadline);
    }
  }, [editIndex, todos]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      if (editIndex !== null) {
        updateTodo(editIndex, { text: input, description, priority, deadline, completed: false, createdAt: todos[editIndex].createdAt });
      } else {
        addTodo({
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

  return (
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
  );
}

export default TodoForm;
