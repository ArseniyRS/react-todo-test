import { useState } from "react";
import { arrowSVG } from "~/assets";
import { parseDays } from "~/utils";
import { ITodo } from "./context/TodoContext";
import { TodoItem } from "./TodoItem";
import classes from "./Todo.module.scss";
import { CheckboxBtn } from "../ui/CheckboxBtn";

interface Props {
  date: string;
  todos: ITodo[];
}

export function TodoItemContainer({ date, todos }: Props) {
  const [open, setOpen] = useState(false);
  const todoElements = todos.map((todo) => <TodoItem key={todo.id} date={date} {...todo} />);
  const parsedDate = `${parseDays(date)} Tasks`;

  return (
    <>
      {open && (
        <CheckboxBtn
          label={parsedDate}
          labelPlacement="end"
          checked={open}
          onClick={(e, checked) => setOpen(checked)}
        />
      )}
      <div className={classes.todo__item_container}>
        {!open && (
          <div
            aria-hidden
            className={classes.todo__item_container__title}
            onClick={() => setOpen(!open)}
          >
            <div className={classes.todo__color_border} />
            {parsedDate}
            <button type="button">
              <img src={arrowSVG} alt="" />
            </button>
          </div>
        )}
        {open && <div className={classes.todo__item_container__list}>{todoElements}</div>}
      </div>
    </>
  );
}
