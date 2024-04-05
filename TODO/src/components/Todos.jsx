import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeTodo, updateTodo } from "../features/todo/todoSlice";

function Todos() {
  const todos = useSelector((state) => state.todos);
  const dispatch = useDispatch();

  // Use state to track which todo item's "Update" button has been clicked
  const [editTodoId, setEditTodoId] = useState(null);

  // Use an object to store edited text for each todo item
  const [editedTexts, setEditedTexts] = useState({});

  const handleTextChange = (event, id) => {
    // Update the edited text for the corresponding todo item
    setEditedTexts({ ...editedTexts, [id]: event.target.value });
  };

  const handleUpdateTodo = (id) => {
    // Set the todo item ID to indicate that its "Update" button has been clicked
    setEditTodoId(id);
  };

  const handleSaveUpdate = (id) => {
    // Dispatch updateTodo action with the edited text for this todo item
    if (editedTexts[id]) {
      dispatch(updateTodo({ id, text: editedTexts[id] }));
    }
    // Clear the edited text for this todo item after updating
    setEditedTexts({ ...editedTexts, [id]: "" });
    // Reset the editTodoId to null to hide the input field
    setEditTodoId(null);
  };

  return (
    <>
      <div>Todos</div>
      <ul className="list-none">
        {todos.map((todo) => (
          <li
            className="mt-4 flex justify-between items-center bg-zinc-800 px-4 py-2 rounded"
            key={todo.id}
          >
            <div className="text-white">
              {editTodoId === todo.id ? (
                <input
                  type="text"
                  value={
                    editedTexts[todo.id] !== undefined
                      ? editedTexts[todo.id]
                      : todo.text
                  }
                  onChange={(event) => handleTextChange(event, todo.id)}
                  className="bg-transparent border-none text-white"
                />
              ) : (
                todo.text
              )}
            </div>

            <button
              onClick={() => dispatch(removeTodo(todo.id))}
              className="text-white bg-red-500 border-0 py-1 px-4 focus:outline-none hover:bg-red-600 rounded text-md"
            >
              Remove
            </button>
            {editTodoId === todo.id ? (
              <button
                onClick={() => handleSaveUpdate(todo.id)}
                className="text-white bg-blue-500 border-0 py-1 px-4 focus:outline-none hover:bg-blue-600 rounded text-md"
              >
                Save
              </button>
            ) : (
              <button
                onClick={() => handleUpdateTodo(todo.id)}
                className="text-white bg-blue-500 border-0 py-1 px-4 focus:outline-none hover:bg-blue-600 rounded text-md"
              >
                Update
              </button>
            )}
          </li>
        ))}
      </ul>
    </>
  );
}

export default Todos;
