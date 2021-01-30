import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Alert from "@material-ui/lab/Alert";

interface INotifyProps {
  //error,warning,info,success
  severity: "error" | "warning" | "info" | "success";
  body:string;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      "& > * + *": {
        marginTop: theme.spacing(2),
      },
    },
  })
);

export default function Notify({ severity, body }: INotifyProps) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Alert variant="filled" severity={severity}>
        {body}
      </Alert>
    </div>
  );
}
