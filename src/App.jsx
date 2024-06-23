import './App.css'
import { useState } from 'react'

function App() {
  const defaultData = [
    {
      done: false,
      content: 'Write a blog post',
      type: 'Personal',
      id: Date.now(),
    },
  ]

  const [todos, setTodos] = useState(defaultData)

  function handleSubmit(event) {
    event.preventDefault()
    const formData = new FormData(event.target)
    const query = formData.get('query')
    setTodos([
      ...todos,
      {
        done: false,
        content: query,
        type: 'Personal',
        id: Date.now(),
      },
    ])
    event.target.reset()
  }

  const todoItemsList = todos.map(todo => (
    <li key={todo.id} className="todo-item">
      {todo.content}
    </li>
  ))

  return (
    <div className="app-wrapper">
      <section className="add-container">
        <h2>New Task</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="newTodo">
            <input type="text" name="query" className="new-todo" id="newTodo" />
          </label>
          <button type="submit" className="add-btn">
            Add task
          </button>
        </form>
      </section>
      <section className="review-container">
        <h2>ToDo List</h2>
        <ul className="todo-list">{todoItemsList}</ul>
      </section>
    </div>
  )
}

export default App
