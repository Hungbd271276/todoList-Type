import React from 'react'
import { Todo } from "../Interface";

interface TodoListProps {
    onCheckedCompleted: any
    onChangeTodo: (index: string) => void;
  };

const TodoCompleted = ({onCheckedCompleted, onChangeTodo}:TodoListProps) => {
    return (
        <div>
        <div className="completed">
        <h2>Completed</h2>
        {
          onCheckedCompleted.map((data:Todo, index:number) => (
            <div className="checkbox" key={index}>
              <div className="btn-right">
                <input
                  type="checkbox"
                  defaultChecked
                  disabled
                  onClick={() => onChangeTodo(data.id)}
                />
                <p style={{ color: "#4e4e5b" }}>{data.title}</p>
               
              </div>
              <p style={{ color: "#4e4e5b", paddingLeft: "53px" }}>
                {data.content}
              </p>
            </div>
          ))}
      </div>
        </div>
    )
}

export default TodoCompleted
