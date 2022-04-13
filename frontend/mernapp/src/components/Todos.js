import React, { useContext, useEffect, useRef, useState } from "react";
import todoContext from "../context/todoContext";
import { useNavigate } from "react-router-dom";
import Todoitem from "./Todoitem";
const Todos = () => {
  let navigate = useNavigate();
  const context = useContext(todoContext);
  const { todos, getTodos, editTodo } = context;
  useEffect(() => {
    // console.log();
    if (localStorage.getItem("token")) {
      // console.log(getTodos());
      getTodos();
    } else {
      navigate("/login");
    }
  }, []);
  const ref = useRef(null);
  const refClose = useRef(null);
  const [todo, setTodo] = useState({ id: "", etitle: "", etask: "" ,eisComplete:""});

  const updateTodo = (currentTodo) => {
    ref.current.click();
    console.log(currentTodo.isComplete);
    setTodo({
      id: currentTodo._id,
      etitle: currentTodo.title,
      etask: currentTodo.task,
      eisComplete: currentTodo.isComplete,
    });
  };

  const handleClick = (e) => {
    editTodo(todo.id, todo.etitle, todo.etask,todo.eisComplete);
    refClose.current.click();
  };

  const onChange = (e) => {
    setTodo({ ...todo, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div className="display-4 text-primary text-center">Todos</div>

      <div className="container mx-2">
        {todos.length === 0 && "No Todos to display"}
      </div>

      <table className="table">
        <thead>
          <tr>
            <th scope="col">Title</th>
            <th scope="col">Task</th>
            <th scope="col">IsCompleted</th>
            <th scope="col">Update</th>
            <th scope="col">delete</th>
          </tr>
        </thead>
        <tbody>
          {todos.map((todo) => {
            return (
              <Todoitem key={todo._id} updateTodo={updateTodo} todo={todo} />
            );
          })}
        </tbody>
      </table>

      <button
        ref={ref}
        type="button"
        className="btn btn-dark d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Edit Todo
      </button>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Edit todo
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form className="my-3">
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etitle"
                    name="etitle"
                    value={todo.etitle}
                    aria-describedby="emailHelp"
                    onChange={onChange}
                    minLength={5}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="task" className="form-label">
                    Task
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etask"
                    name="etask"
                    value={todo.etask}
                    onChange={onChange}
                    minLength={5}
                    required
                  />
                </div>
                <div className="mb-3">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      id="isComplete"
                      value="true"
                      name="eisComplete"
                      onChange={onChange}
                    />
                    <label className="form-check-label" htmlFor="isComplete">
                      Yes
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      id="isComplete"
                      value="false"
                      name="eisComplete"
                      onChange={onChange}
                    />
                    <label className="form-check-label" htmlFor="isComplete">
                      No
                    </label>
                  </div>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                ref={refClose}
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                disabled={todo.etitle.length < 5 || todo.etask.length < 5}
                onClick={handleClick}
                type="button"
                className="btn btn-dark"
              >
                Update Todo
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Todos;
