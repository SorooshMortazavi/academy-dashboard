import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { truncate } from "fs";

interface IDialogProps {
  isOpen: boolean;
  dialogTitle: string;
  dialogBody: string;
  handleConfirm:Function
}

export default function ConfirmDialog({
  isOpen,
  dialogTitle,
  dialogBody,
  handleConfirm
}: IDialogProps) {
//   const [open, setOpen] = React.useState(isOpen);

  const handleClose = (isConfirm:boolean) => {
    handleConfirm(isConfirm)
  };

  return (
    <div>
      <Dialog
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{dialogTitle}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {dialogBody}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleClose(false)} color="primary">
            خیر
          </Button>
          <Button onClick={() => handleClose(true)} color="primary" autoFocus>
            بله
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
