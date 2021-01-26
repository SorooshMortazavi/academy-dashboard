import { Container, Grid } from "@material-ui/core";
import React from "react";
import RTL from "../../theme/RTL";
import SideBar from "../partials/SideBar";
import Routes from '../../router/Routes';

export default function Panel() {
  return (
    <RTL>
      <div className="app">
        <Container maxWidth={"xl"}>
          <Grid container spacing={3}>
            <Grid item lg={3} xl={2} md={4} sm={12} >
              <SideBar />
            </Grid>
            <Grid item lg={9} xl={10} md={8} sm={12}>
              <Routes/>
            </Grid>
          </Grid>
        </Container>
      </div>
    </RTL>
  );
}
