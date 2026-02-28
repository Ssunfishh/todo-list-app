"use client";
import { useState } from 'react';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

export default function Page() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState('');

  function addTodo() {
    if (!input.trim()) return;
    setTodos(prev => [...prev, { id: Date.now(), text: input.trim(), completed: false }]);
    setInput('');
  }

  function toggleTodo(id: number) {
    setTodos(prev => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  }

  function deleteTodo(id: number) {
    setTodos(prev => prev.filter(t => t.id !== id));
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter') addTodo();
  }

  return (
    <div className="container">
      <h1 className="title">📝 Todo List</h1>
      <div className="input-row">
        <input
          className="input"
          type="text"
          placeholder="Add a new task..."
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          aria-label="New task input"
        />
        <button className="btn add" onClick={addTodo}>Add</button>
      </div>
      <ul className="list">
        {todos.length === 0 ? (
          <li className="empty">No tasks yet. Add one above!</li>
        ) : (
          todos.map(todo => (
            <li key={todo.id} className={`item ${todo.completed ? 'completed' : ''}`}>
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleTodo(todo.id)}
                aria-label={`Mark "${todo.text}" as ${todo.completed ? 'incomplete' : 'complete'}`}
              />
              <span className={todo.completed ? 'completed' : ''}>{todo.text}</span>
              <button className="btn delete" onClick={() => deleteTodo(todo.id)}>Delete</button>
            </li>
          ))
        )}
      </ul>
      <div className="footer">{todos.filter(t => !t.completed).length} tasks remaining</div>
    </div>
  );
}
