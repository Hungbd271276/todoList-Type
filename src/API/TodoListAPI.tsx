import axios from "axios";
import React from "react";
import { type } from "os";
import { axiosClient } from "./AxiosClient";
import { Todo } from "../component/Interface";


const TodoListAPI = {
    getAll()  {
       const url = `/todo`;
       return axiosClient.get(url);
    },
    get(id: any) {
        const url =`/todo/${id}`;
        return axiosClient.get(url);
    },
    add(todo: any)  {
        const url = `/todo`;
        return axiosClient.post(url, todo);
    },
    update(id:any ,todo:any) {
        const url = `/todo/${id}`;
        return axiosClient.put(url, todo);
    },
    remove(id:any) {
          const url = `/todo/${id}`;
          return axiosClient.delete(url);
    }
}

export default TodoListAPI;