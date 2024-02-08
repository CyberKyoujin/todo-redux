import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useDispatch, useSelector } from 'react-redux'
import { fetchTodos, addTodo, completeTodo, deleteTodo } from './todosSlice'
import { MdDelete } from "react-icons/md";

function App() {

  const dispatch = useDispatch();

  const [description, setDescription] = useState('');

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  const todos = useSelector((state) => state.todos.todos);
  const loading = useSelector((state) => state.todos.loading);

  const todosList =  todos.filter((todo) => todo.completed  === false);
  const todosCompleted = todos.filter((todo) => todo.completed  === true);

  console.log(todosList, todosCompleted)

  const handleSubmit = (e) => {
    e.preventDefault();
    if (description.trim()) {
        dispatch(addTodo(description))
            .then(() => {
                dispatch(fetchTodos());
            });
        setDescription(''); 
    }
  }

  const handleChange = (id) => {
     dispatch(completeTodo(id))
        .then(() => {
          dispatch(fetchTodos());
        })
  }

  const handleDelete = (id) => {
    dispatch(deleteTodo(id))
      .then(() => {
        dispatch(fetchTodos());
      })
  }

  return (
    <main>
       <div className='main-container'>
        {loading === 'pending' && <div>Loading...</div>}
        {loading === 'failed' && <div>Error fetching todos...</div>}
        <h1>My tasks</h1>
        <form className='form-container' onSubmit={handleSubmit}>
           <input type="text" placeholder='Add a new todo task...' onChange={(e) => setDescription(e.target.value)}/>
           <button type='submit'>Submit</button>
        </form>
        {todosList.map((todo) => (
          <div className='todo-container' key={todo.id}>
            <p>{todo.description}</p>
            <div className='todo-footer'>
              <button onClick={() => handleDelete(todo.id)}><MdDelete/></button>
              <input type="checkbox" onChange={() => handleChange(todo.id)}/>
            </div>
          </div>
        ))}

        <div className='completed-container'>
          <h1>Completed tasks</h1>
          {todosCompleted.map((todo) => (
            <div className='todo-completed-container' key={todo.id}>
              <p>{todo.description}</p>
              <div className='todo-footer'>
              <button onClick={() => handleDelete(todo.id)}><MdDelete/></button>
            </div>
            </div>
          ))}
        </div>

       </div>
    </main>
  )
}

export default App
