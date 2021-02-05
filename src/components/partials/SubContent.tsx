import { Box, Divider, Paper, Typography } from "@material-ui/core";
import React from "react";

interface ISubContent {
  title: string;
  children: any;
}
export default function SubContent({ title, children }: ISubContent) {
  return (
    <Paper className='p-2' component="div" elevation={2}>
        <Typography  variant="h5">{title}</Typography>
        <Divider className='bg-dark my-1 mb-3' />
      <Box className='m-2 p-1'>
        {children}
      </Box>
    </Paper>
  );
}
