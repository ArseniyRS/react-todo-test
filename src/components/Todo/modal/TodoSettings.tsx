import { Modal } from "@mui/material";
import { SwitchBtn } from "~/components/ui/SwitchBtn";
import classes from "../Todo.module.scss";

interface Props {
  open: boolean;
  settings: boolean;
  setSettings: () => void;
  handleClose: () => void;
}

export function TodoSettings({ open, settings, setSettings, handleClose }: Props) {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <div className={`modal container ${classes.todo__modal}`}>
        <h3 className={classes.todo__modal_title}>Todo settings</h3>
        <div className={classes.todo__settings}>
          Enable news
          <SwitchBtn checked={settings} onChange={setSettings} />
        </div>
      </div>
    </Modal>
  );
}
