import React,{useContext, useState} from 'react'
import todoContext from '../context/todoContext'

function Todoitem(props) { 
    const context = useContext(todoContext);
    const { deleteTodo } = context;
    const { todo ,updateTodo} = props;

     
  return (
      
  
    <tr>
      <td>{todo.title}</td>
      <td>{todo.task}</td>
      <td><input type="checkbox" className="form-check-input" id="isComplete" checked={todo.isComplete=="true"} onChange={()=>{console.log("ok")}}  /></td>
      <td><i className="far fa-edit mx-2" onClick={()=>{updateTodo(todo)}} ></i></td>
      <td><i className="far fa-trash-alt mx-2" onClick={()=>{deleteTodo(todo._id)}} ></i></td>
    </tr>
   
 
  )
}

export default Todoitem