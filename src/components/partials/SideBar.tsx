import { Divider, List, Paper } from "@material-ui/core";
import React from "react";
import Courses from "../menu/courses/Courses";
import Orders from "../menu/orders/Orders";
import Settings from "../menu/settings/Settings";
import Masters from '../menu/masters/Masters';
import Payments from '../menu/payments/Payments';
import Students from '../menu/students/Students';

export default function SideBar() {
  return (
    <Paper elevation={2}>
      <List  component="nav">
        <Courses/>
        <Divider />
        <Orders/>
        <Divider/>
        <Masters/>
        <Divider/>
        <Students/>
        <Divider/>
        <Payments/>
        <Divider/>
        <Settings/>
      </List>
    </Paper>
  );
}
