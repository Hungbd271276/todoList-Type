import React, { useState } from "react";
import { Todo } from "./Interface";
import { v4 as uuid } from 'uuid';

interface TodoListProps {
  todoList: Todo[];
  onAdd: (index: Todo) => void
  closeModal: (index: boolean) => void;
};

const Modal = ({onAdd, closeModal, todoList}:TodoListProps) => {
  const [inputValue, setInputValue] = useState("");
  const [inputContent, setInputContent] = useState("");

  const onHandleSubmit = (e:any) => {
    e.preventDefault();
    onAdd({id: uuid(), title: inputValue, content:inputContent, Completed: false});
  };

  return (
    <div className="modalbackground">
      <div className="modalContainer">
        <div className="close" onClick={() => closeModal(false)}>
          <i className="fas fa-times"></i>
        </div>
        <h3 className="edit-modal">ADD Todo</h3>
        <form action="" onSubmit={(e) => onHandleSubmit(e)}>
          <div className="input-texts">
          <label htmlFor="title">Title</label><br/>
            <input
              type="text"
              id="title"
              placeholder="Title..."
              required
              onChange={(e) => setInputValue(e.target.value)}
            />
          </div>
          <div className="content-texts">
             <label htmlFor="content">Content</label><br/>
              <select  id="content" required
              onChange={(e) => setInputContent(e.target.value)}> 
                {
                todoList.map((todo) => (
                  <option value={todo.content} key={todo.id}>{todo.content}</option>
                ))
                }
              </select>
          </div>
          <div className="btn-submit">
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;
