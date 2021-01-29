import {
  makeStyles,
  Divider,
  Paper,
  Theme,
  Typography,
  Box,
} from "@material-ui/core";
import React from "react";
const useStyles = makeStyles((theme: Theme) => ({
  title: {
    padding: "8px",
    fontWeight: 400,
  },
  paper: {
    width: "100%",
  },
}));

function Content(props: React.PropsWithChildren<{ title: string }>) {
  const classes = useStyles();
  return (
    <Paper className={classes.paper} elevation={2}>
      <Typography variant="h2" className={classes.title}>
        {props.title}
      </Typography>
      <Divider />
      <Box style={{margin:'12px',padding:'8px'}}>{props.children}</Box>
    </Paper>
  );
}

export default Content;
