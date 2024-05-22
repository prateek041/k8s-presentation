import React from "react"

export interface TodoItem {
  text: string
  completed: boolean
}

const TodoItem: React.FC<TodoItem> = ({ text, completed }) => {
  return (
    <div>This is a {`${text}`}and it is {`${completed}`}</div>)
}

export default TodoItem
