import React, { useEffect, useState } from "react";
import "./App.css";
import Modal from "./component/Modal";
import Header  from "./component/Header";
import TodoComplete from "./component/TodoList/IsCompleted";
import { Todo } from "./component/Interface";
import TodoListAPI from './API/TodoListAPI';
import EditModal from "./component/EditModal";
import axios from "axios";


function App() {
  const [openModal, setopenModal] = useState(false);

  const [todoList, setTodoList] = useState<Todo[]>([
    // {
    //   id: 1,
    //   title: "Upload 1099-R to TurboTax",
    //   content: "finance",
    //   Completed: true,
    // },
    // {
    //   id: 2,
    //   title: "Submit 2019 tax return",
    //   content: "finance",
    //   Completed: false,
    // },
    // {
    //   id: 3,
    //   title: "Print parking passes",
    //   content: "Wedding",
    //   Completed: false,
    // },
    // {
    //   id: 4,
    //   title: "Sign contract, send back",
    //   content: "Freelance",
    //   Completed: false,
    // },
    // {
    //   id: 5,
    //   title: "Hand sanitizel",
    //   content: "Shopping list",
    //   Completed: true,
    // },
  ]);
    
  useEffect(() => {
    const getTodoList = async () => {
      try {
        const {data} = await TodoListAPI.getAll()      
        setTodoList(data);
      } catch (error) {
         console.log(error);
      }
    } 
    getTodoList();
 },[]); 
  
 // ADD
  const HandleAdd = async (todo:Todo) => {
      try {
        const {data} = await TodoListAPI.add(todo)    
        setTodoList([
          ...todoList,
          data
        ])
      } catch (error) {
         console.log(error);
      }
  }
  // DELETE
   const HandleDelete = async (id:string) => {
     try {
      const ondelete = window.confirm('Bạn có muốn xóa không');
      if(ondelete) {
        await TodoListAPI.remove(id);    
        const newTodo = todoList.filter(todo => todo.id !== id);
        setTodoList(newTodo);
      }
     } catch (error) {
       console.log(error);
     }
   }
    
  
   
   

   // update
   const handleEdit = async (id: any, todo: any) => {
      // console.log('update', id);
      try {
        const {data} = await axios.put(`https://618b2b833013680017343f5f.mockapi.io/api/v1/todo/${id}`,todo);
        console.log(data);
        const newTodo = todoList.map(item => (item.id === id ? data : item));
          setTodoList(newTodo); 
      } catch (error) {
          console.log(error);
       }
   }
  


  // Check filter Completed
  const isCompleted = todoList.filter((item) => {
    return item.Completed === false;
  });
  const completed = todoList.filter((item) => {
    return item.Completed === true;
  });

  const handleChangeTodo = (index: string): void => {
    const newState = todoList.map((item) => {
      if (item.id == index) {
        return { ...item, 
          Completed: !item.Completed };
      } else {
        return item;
      }
    });
    setTodoList(newState);
  };
  return (
    <div className="Apps">
      <div className="icons openModalBtn" onClick={() => setopenModal(true)}>
        <i className="fas fa-plus"></i>
      </div>
      {openModal && (
        <Modal closeModal={setopenModal} onAdd={HandleAdd} todoList={todoList} />
      )}

      <Header
        todoList={todoList}
        onChangeTodo={handleChangeTodo}
        onisCompleted={isCompleted}
        oncompleted={completed}
      />
      <TodoComplete
        todoList={todoList}
        onChangeTodo={handleChangeTodo}
        onisCompleted={isCompleted}
        oncompleted={completed}
        
        onDelete = {HandleDelete}
        onEdit={handleEdit}
      />

    </div>
  );
}

export default App;
