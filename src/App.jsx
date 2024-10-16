import { useReducer, useState } from 'react'
import Todo from './Todo'
export const ACTIONS = {
  ADD_TODO: "addTodo",
  TOGGLE_TODO: "toggleTodo",
  REMOVE_TODO: "removeTodo"

}
function reducer(todos, actions) {
  switch(actions.type) {
    case ACTIONS.ADD_TODO:
      return [...todos, newTodo(todos, actions.payload.name)]
    case ACTIONS.TOGGLE_TODO:
      return todos.map((todo) => {
        if(todo.id === actions.payload.id) {
          return {...todo, completed: !todo.completed}
        }
        return todo
      })
    case ACTIONS.REMOVE_TODO:
      return todos.filter((todo) => todo.id !== actions.payload.id)
    default:
      return todos
  }
}

function newTodo(todos, name) {
  return {id: Date.now(), name: name, completed: false}
}
function App() {
  const [todos , dispatch] = useReducer(reducer,[])
  const [name, setName] = useState('')
  function handleSubmit(e) {
    e.preventDefault()
    console.log(name)
    if(name.trim() === '') return
    if(todos.find((todo) => todo.name === name)) {
      return alert('Todo already exists')
    }
    dispatch({type: ACTIONS.ADD_TODO, payload:{name: name}})
    setName('')
  }  
  console.log(todos)
  return (
   <>
   <form onSubmit={handleSubmit}>
    <input type="text" value={name} onChange={(e) => setName(e.target.value)}/>
   </form>
   {todos.map((todo) => (
    <Todo key={todo.id} todo={todo} dispatch={dispatch}/>
   ))}
   </>
  )
}

export default App
