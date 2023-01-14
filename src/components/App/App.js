import { useEffect, useState } from 'react';
import Form from '../Form/Form';
import './App.css';

function App() {

  const [todos, setTodos] = useState([]);
  const [allTodos, setAllTodos] = useState(0);
  const [allComplete, setAllComplete] = useState(0);

  useEffect(() => {
    setAllComplete(todos.filter(todo => todo.done === true).length)
  }, [todos])

  const putTodo = (value) => {
    if (value) {
      setTodos([...todos, {
        id: Date.now(),
        text: value,
        done: false,
      }])
      setAllTodos(allTodos + 1)
    } else {
      alert("Введите текст!")
    }
  }

  const toggleTodo = (id) => {
    setTodos(todos.map(todo => {
      if (todo.id !== id) return todo;

      return {
        ...todo,
        done: !todo.done
      }
    }))
  }

  const removeTodo = (id) => {
    setTodos(todos.filter( todo => todo.id !== id));
    setAllTodos(allTodos - 1)
  }

  const clearTodos = () => {
    setTodos([]);
    setAllTodos(0)
  }

  return (
    <div className='wrapper'>
      <div className='container'>
        <h1 className='title'> Todo List</h1>
        <Form putTodo={putTodo} />
        <ul className='todos'>
          {
            todos.map(todo => {
              return (
                <li className={todo.done ? "todo done" : "todo"} key={todo.id} onClick={() => toggleTodo(todo.id)}>
                  {todo.text}
                  <img src="./delete.svg" alt="delete" className='delete' 
                  onClick={e => {
                    e.stopPropagation();
                    removeTodo(todo.id);
                    }} />
                </li>
              )
            })
          }
          <div className='info'>
            <span>All todos: {allTodos}</span>
            <span>Complete: {allComplete}</span>
          </div>
          <button className='btn' onClick={clearTodos}>Clear all</button>
        </ul>
      </div>
    </div>
  );
}

export default App;
