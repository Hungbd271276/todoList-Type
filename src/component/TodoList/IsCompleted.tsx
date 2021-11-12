import { type } from "os";
import React, { useState } from "react";
import TodoCompleted from "./Completed";
import { Todo } from "../Interface";
import EditModal from "../EditModal";
import {
  BrowserRouter,
  Routes,
  Route,
  Link
} from 'react-router-dom';

interface TodoListProps  {
  todoList: Todo[];
  onisCompleted: any
  oncompleted: any,
  onEdit: any,
  onDelete: (index: string) => void,
  onChangeTodo: (index: string) => void;

};
 
const TodoComplete = ({todoList, onChangeTodo, onisCompleted, oncompleted, onDelete ,onEdit}:TodoListProps) => {
         const [editModal, setEditModal] = useState(false);
  return (
    <div>
      <div className="Incomplete">
        <h2>Incomplete</h2>
        {
          onisCompleted.map((data:Todo, index:number) => (
            <div className="checkbox" key={index}>
              <div className="btn-left">
                <input
                  type="checkbox"        
                  onClick={() => onChangeTodo(data.id)}
                />
                <p style={{ color: "#b7b7b8" }}>{data.title}</p>
               <button className="btn-update" onClick={() => setEditModal(true)}><Link to={`/editTodo/${data.id}`}>Update</Link></button>
                <button type="submit" className="btn-delete" onClick={() => onDelete(data.id)}>Delete</button>
              </div>

              <p style={{ color: "#b7b7b8", paddingLeft: "45px" }}>
                {data.content}
              </p>
            </div>
          ))}  
      </div>
        <TodoCompleted onCheckedCompleted={oncompleted} onChangeTodo={onChangeTodo}  />
        {
          editModal && (
            <EditModal todoList={todoList} onEdit={onEdit} onEditModal={setEditModal}/> 
          )
        }
       
    
      <Routes>
        <Route path="/editTodo/:id" element={<EditModal todoList={todoList} onEdit={onEdit} onEditModal={setEditModal}/>} />
      </Routes>
    </div>
  );
};

export default TodoComplete;