import { Button, Modal } from "@mui/material";
import { useTodoList } from "../context/TodoContext";
import classes from "../Todo.module.scss";

interface Props {
  open: boolean;
  date: string;
  todoTitle: string;
  todoId: number;
  handleClose: () => void;
}

export function TodoDelete({ open, todoTitle, todoId, date, handleClose }: Props) {
  const { deleteTodo } = useTodoList();

  const handleSubmit = () => {
    deleteTodo(date, todoId);
    handleClose?.();
  };
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <div className={`modal container ${classes.todo__modal}`}>
        <h3 className={classes.todo__modal_title}>{`Delete "${todoTitle}" task?`}</h3>
        <div className={classes.todo__modal_btns}>
          <Button variant="contained" className="success_btn" onClick={handleSubmit}>
            Delete
          </Button>
          <Button variant="contained" className="cancel_btn" onClick={handleClose}>
            Cancel
          </Button>
        </div>
      </div>
    </Modal>
  );
}
