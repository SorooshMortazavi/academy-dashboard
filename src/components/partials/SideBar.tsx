import { Divider, List, Paper } from "@material-ui/core";
import React from "react";
import Courses from "../menu/courses/Courses";
import Orders from "../menu/orders/Orders";
import Settings from "../menu/settings/Settings";

export default function SideBar() {
  return (
    <Paper elevation={2}>
      <List  component="nav">
        <Courses/>
        <Divider />
        <Orders/>
        <Divider/>
        <Settings/>
      </List>
    </Paper>
  );
}
