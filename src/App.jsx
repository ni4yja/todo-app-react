import './App.css'
import { useState, useEffect } from 'react'

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
  const [category, setCategory] = useState('Personal')

  useEffect(() => {
    saveData()
  }, [todos])

  function saveData() {
    const storageData = JSON.stringify(todos)
    localStorage.setItem('todos', storageData)
  }

  function toggleDone(id) {
    setTodos(
      todos.map(todo =>
        todo.id === id ? { ...todo, done: !todo.done } : todo
      )
    )
  }

  function removeTodo(id) {
    setTodos(todos.filter((todo) => todo.id !== id))
  }

  function handleSubmit(event) {
    event.preventDefault()
    const formData = new FormData(event.target)
    const todo = formData.get('todo')
    const category = formData.get('category') || 'Personal'

    if (!todo) return

    setTodos([
      ...todos,
      {
        done: false,
        content: todo,
        type: category,
        id: Date.now(),
      },
    ])
    event.target.reset()
    setCategory('Personal')
  }

  const todoItemsList = todos.map(todo => (
    <li key={todo.id} className={`todo-item ${todo.done ? 'done' : ''}`}>
      <span className="task" onClick={() => toggleDone(todo.id)}>{todo.content}</span>
      <span className="label">{todo.type}</span>
      <button className="remove-btn" onClick={() => removeTodo(todo.id)}></button>
    </li>
  ))

  return (
    <div className="app-wrapper">
      <section className="add-container">
        <h2>New Task</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="newTodo">
            <input type="text" name="todo" className="new-todo" id="newTodo" />
          </label>
          <fieldset>
          <legend>Please select your todo type:</legend>
          <div className="labels">
            <input
              id="typeChoice1"
              type="radio"
              name="category"
              value="Personal"
              defaultChecked={category === 'Personal'}
            />
            <label htmlFor="typeChoice1">Personal</label>
            <input
              id="typeChoice2"
              type="radio"
              name="category"
              value="Work"
            />
            <label htmlFor="typeChoice2">Work</label>
            <input
              id="typeChoice3"
              type="radio"
              name="category"
              value="Other"
            />
            <label htmlFor="typeChoice3">Other</label>
          </div>
        </fieldset>
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