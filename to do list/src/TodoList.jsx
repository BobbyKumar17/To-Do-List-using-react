import React from 'react';
import { FaTrashAlt, FaCheck, FaEdit } from 'react-icons/fa';
import { formatDistanceToNow } from 'date-fns';

function TodoList({ todos, deleteTodo, toggleTodo, setEditIndex }) {
  return (
    <table className="todo-list">
      <thead>
        <tr>
          <th>Task</th>
          <th>Description</th>
          <th>Priority</th>
          <th>Deadline</th>
          <th>Created At</th>
          <th>Edit</th>
          <th>Done</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        {todos.map((todo, index) => (
          <tr key={index} className={`todo-item ${todo.completed ? 'completed' : ''}`}>
            <td>{todo.text}</td>
            <td>{todo.description}</td>
            <td className={`priority ${todo.priority.toLowerCase()}`}>{todo.priority}</td>
            <td>{todo.deadline}</td>
            <td>{formatDistanceToNow(new Date(todo.createdAt))} ago</td>
            <td><FaEdit onClick={() => setEditIndex(index)} className="edit-icon" /></td>
            <td><FaCheck onClick={() => toggleTodo(index)} className="check-icon" /></td>
            <td><FaTrashAlt onClick={() => deleteTodo(index)} className="delete-icon" /></td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default TodoList;
