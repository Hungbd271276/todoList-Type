import React, { useEffect, useState } from 'react'
import { Todo } from "./Interface";
import { v4 as uuid } from 'uuid';
import { useParams } from "react-router-dom";
import TodoListAPI from '../API/TodoListAPI';
import axios from 'axios';
interface TodoListProps  {
    todoList: any;
    onEdit: any,
    onEditModal: (index: boolean) => void;
  };
  
const EditModal = ({onEdit, onEditModal, todoList}:TodoListProps) => {
     const {id} = useParams();
      const [valueEdit,setvalueEdit] = useState({} as any);


    const [inputValue, setInputValue] = useState("");
    const [inputContent, setInputContent] = useState("");
    console.log(valueEdit);
    
    useEffect(() => {
      const getUpdateTodo = async () => {
        try {
           const { data: todo } = await axios.get(`https://618b2b833013680017343f5f.mockapi.io/api/v1/todo/${id}`);
           setvalueEdit(todo);
        } catch (error) {
          console.log(error);
        }
      };
      getUpdateTodo();
    },[])
  
    const onHandleSubmit = (e:any) => {
        e.preventDefault();
        onEdit({id: valueEdit.id, title: inputValue, content:inputContent, Completed: false});
      };

    return (
        <div className="modalbackground">
        <div className="modalContainer">
       
          <div className="close" onClick={() => onEditModal(false)}>
            <i className="fas fa-times"></i>
          </div>
          <h3 className="edit-modal">EDIT Todo</h3>
          <form action="" onSubmit={(e) => onHandleSubmit(e)}>
            <div className="input-text_edit">
              <label htmlFor="title">Title</label><br/>
              <input
                type="text"
                id="title"
                placeholder="Title..."
                 required
                 defaultValue={valueEdit.title}
                onChange={(e) => setInputValue(e.target.value)}
              />
            </div>
            <div className="input-text_edit">
              <label htmlFor="content">Content</label><br/>
                <select  id="content" required
                onChange={(e) => setInputContent(e.target.value)}> 
                  {
                  todoList.map((todo:any) => (
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
    )
}

export default EditModal
