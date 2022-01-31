
import 'bootstrap/dist/css/bootstrap.min.css';

import React, { useState, useEffect } from "react";
import "./App.css";

const getLocalStorageData = () => {
  let list = localStorage.getItem('List');
  console.log(list)

  if (list) {
    return JSON.parse(localStorage.getItem('List'));
  } else {
    return [];
  }
}
function App() {
  const [value, setValue] = useState("")
  const [newVal, setNewVal] = useState("")
  const [refresh, setrefresh] = useState(false)
  const [todos, setTodos] = useState(getLocalStorageData(), [
    {
      title: "Learn about React",
      edit: false,
    },
    {
      title: "Meet friend for lunch",
      edit: false,
    },
    {
      title: "Build really cool todo app",
      edit: false,
    }
  ]);

  const addTodo = () => {
    const newTodos = [...todos, { title: value, edit: false }];
    setTodos(newTodos);
    setValue("")
  };
  const deleteTodo = (i) => {
    const newTodos = [...todos];
    newTodos.splice(i, 1);
    setTodos(newTodos);
  }
  const edit_todo = (i) => {
    console.log(i);
    const newTodos = [...todos];
    newTodos[i].edit = true
    console.log(newTodos); 
    setTodos(newTodos);
    setValue("")
  }
  const handlechange = (e, index) => {
    console.log(e);
    console.log(index);
    const newTodos = [...todos];
    newTodos[index].title = e.target.value;
    setNewVal(e.target.value)
    // setTodos(newTodos);
  }

  const update = (i) => {
    setrefresh(!refresh)
    const newTodos = [...todos];
    newTodos[i].title = newVal;
    newTodos[i].edit = false;
    // setTodos(newTodos);
  }

  const clearAll= () => {
    setTodos([]);
  }
  console.log(todos) 

  //add data to local storage 
  useEffect(() => {
   localStorage.setItem('List' , JSON.stringify(todos))
  }, [todos])
  return (
    <div>
      <h1>Todo Application</h1>
      <ul>
        <input value={value} onChange={(e) => setValue(e.target.value)} type="text" placeholder="Enter value" />
        <button onClick={addTodo}>Add Item</button>
        <button onClick={clearAll}>Delete all</button>
        {
          todos.map((v, i) => {
            return <li key={i}>
              {v.edit ? <input value={v.title} onChange={(e)=> handlechange(e, i)} type="text" /> : v.title}
              <br />
              {v.edit ? <button onClick={()=> update(i)}>Update</button> :
                <button onClick={()=> edit_todo(i)}>Edit</button>}
              <button onClick={()=> deleteTodo(i)}>Delete </button>
              <br />
            </li>
          }
          )}
      </ul>
    </div>
  )
}

export default App


