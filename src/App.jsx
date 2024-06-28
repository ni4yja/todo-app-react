import "./App.css"
import { useState, useEffect, useMemo } from "react"

function App() {
  const defaultData = [
    {
      done: false,
      content: "Write a blog post",
      type: "Personal",
      id: Date.now(),
    },
  ];

  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem("todos");
    return savedTodos ? JSON.parse(savedTodos) : defaultData;
  });
  const [category, setCategory] = useState("Personal");
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    saveData();
  }, [todos]);

  function saveData() {
    const storageData = JSON.stringify(todos);
    localStorage.setItem("todos", storageData);
  }

  function toggleDone(id) {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, done: !todo.done } : todo
      )
    );
  }

  function removeTodo(id) {
    setTodos(todos.filter((todo) => todo.id !== id));
  }

  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const todo = formData.get("todo");
    const category = formData.get("category") || "Personal";

    if (!todo) return;

    setTodos([
      ...todos,
      {
        done: false,
        content: todo,
        type: category,
        id: Date.now(),
      },
    ]);
    event.target.reset();
    setCategory("Personal");
  }

  const filteredTodos =
    filter === "All" ? todos : todos.filter((todo) => todo.type === filter);

  const todoItemsList = filteredTodos.map((todo) => (
    <li key={todo.id} className={`todo-item ${todo.done ? "done" : ""}`}>
      <span className='task' onClick={() => toggleDone(todo.id)}>
        {todo.content}
      </span>
      <span className='label'>{todo.type}</span>
      <button
        className='remove-btn'
        onClick={() => removeTodo(todo.id)}
      ></button>
    </li>
  ));

  const todoTagsList = ["All", "Personal", "Work", "Other"].map((tag) => (
    <li key={tag}>
      <span
        className={`tag ${filter === tag ? "active" : ""}`}
        onClick={() => setFilter(tag)}
      >
        {tag}
      </span>
    </li>
  ));

  const emptyNote = useMemo(() => {
    return `There are no tasks with type ${filter} so far. Please, add some!`;
  }, [filter]);

  const showEmptyMessage = todos.length === 0;

  return (
    <div className='app-wrapper'>
      <section className='add-container'>
        <h2>New Task</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor='newTodo'>
            <input type='text' name='todo' className='new-todo' id='newTodo' />
          </label>
          <fieldset>
            <legend>Please select your todo type:</legend>
            <div className='labels'>
              <input
                id='typeChoice1'
                type='radio'
                name='category'
                value='Personal'
                defaultChecked={category === "Personal"}
              />
              <label htmlFor='typeChoice1'>Personal</label>
              <input
                id='typeChoice2'
                type='radio'
                name='category'
                value='Work'
              />
              <label htmlFor='typeChoice2'>Work</label>
              <input
                id='typeChoice3'
                type='radio'
                name='category'
                value='Other'
              />
              <label htmlFor='typeChoice3'>Other</label>
            </div>
          </fieldset>
          <button type='submit' className='add-btn'>
            Add task
          </button>
        </form>
      </section>
      {showEmptyMessage ? (
        <section className='empty-container'>
          <h2>Your tasks will appear here</h2>
          <img
            src='https://doodleipsum.com/700?i=b2a7f828acad27e884b0aabcf6f10ab6'
            alt='a picture of man relaxing and drinking tea'
          />
        </section>
      ) : (
        <section className='review-container'>
          <h2>ToDo List</h2>
          <ul className='tags-wrapper'>{todoTagsList}</ul>
          {filteredTodos.length === 0 ? (
            <p className='empty-message'>{emptyNote}</p>
          ) : (
            <ul className='todo-list'>{todoItemsList}</ul>
          )}
        </section>
      )}
    </div>
  );
}

export default App
