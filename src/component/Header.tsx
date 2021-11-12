import { type } from "os";
import React from "react";
import moment from "moment";
import { Todo } from "./Interface";

interface TodoListProps  {
  todoList: Todo[];
  onisCompleted: any
  oncompleted: any
  onChangeTodo: (index: string) => void;
};

const Header = ({ onisCompleted, oncompleted}: TodoListProps) => {
  return (
    <div>
      <h1 className="title">
        {moment().format("MMMM DD, YYYY")} 
      </h1>
      <div className="header-complete">
        <p className="completes"> {onisCompleted.length} incomplete,</p>
        <p className="completes"> {oncompleted.length} completed</p>
      </div>
    </div>
  );
};

export default Header;
