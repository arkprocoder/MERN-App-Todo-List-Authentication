import React, {useContext, useState} from 'react'
import todoContext from '../context/todoContext'
import Todos from './Todos';


function Addtodos() {
  const context = useContext(todoContext);
  const {addTodos} = context;

  const [todo, setTodo] = useState({title: "", task: ""})

  const handleClick=(e)=>{
    e.preventDefault();
    addTodos(todo.title,todo.task);
    setTodo({title: "", task: ""})

  }
  
  const onChange = (e)=>{
    setTodo({...todo, [e.target.name]: e.target.value})
}
  return (
    <>
    <div className='container m-3'>
     <div className="row">

       <div className="col-md-5">
         <div className="card m-3 p-3">
         <h3 className="display-4 text-primary text-center">
        Add Todo
      </h3>

<form>

<div className="form-group">
  <input type="text" className="form-control" id="title" name="title" aria-describedby='enter name' value={todo.title} onChange={onChange}   minLength={5} placeholder="Title" required/>
</div>
<div className="form-group mt-2">
  <textarea type="text" className="form-control" id="task" name="task" aria-describedby='enter task' value={todo.task} onChange={onChange}   minLength={5} placeholder="Task" required></textarea>
</div>

<button disabled={todo.title.length<5 || todo.task.length<5} type="submit" className="btn btn-dark mt-2" onClick={handleClick}>Add Note</button>
</form>




         </div>
     


       </div>
       <div className="col-md-7">

         <Todos />
       </div>
     </div>
      
    </div>
    </>
  )
}


export default Addtodos