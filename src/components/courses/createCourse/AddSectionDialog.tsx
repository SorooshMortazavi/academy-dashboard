import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

interface IAddFormProps {
  open: boolean;
  handleOk: Function;
  handleClose: Function;
}

export default function FormDialog({
  open,
  handleOk,
  handleClose,
}: IAddFormProps) {
  const [texts, setTexts] = React.useState({ title: "", slug: "", number: 0 });
  const [isButtonDisable, setIsButtonDisable] = React.useState(true);

  function checkInputs() {
    if (texts.title.length > 3 && texts.slug.length > 3 && texts.number >= 0) {
      setIsButtonDisable(false);
    } else {
      setIsButtonDisable(true);
    }
  }
  return (
    <div>
      <Dialog open={open} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">سرفصل</DialogTitle>
        <DialogContent>
          <DialogContentText>
            عنوان سر فصل جدید را برای این دوره وارد کنید:
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            value={texts.title}
            onChange={(e) => {
              setTexts((prev: any) => {
                return { ...prev, title: e.target.value };
              });
              checkInputs()
            }}
            label="عنوان دوره"
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            value={texts.slug}
            onChange={(e) => {
              setTexts((prev: any) => {
                return { ...prev, slug: e.target.value };
              });
              checkInputs()
            }}
            label="اسلاگ"
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            value={texts.number}
            onChange={(e) => {
              setTexts((prev: any) => {
                return { ...prev, number: e.target.value };
              });
              checkInputs()
            }}
            type="number"
            label="شماره سر فصل"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={(e) => handleClose(e)} color="primary">
            لغو
          </Button>
          <Button
            onClick={(e) => handleOk(e, texts)}
            disabled={isButtonDisable}
            color="primary"
          >
            انجام
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
