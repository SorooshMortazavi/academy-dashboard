import {
  Badge,
  Collapse,
  Divider,
  List,
  ListItemIcon,
  makeStyles,
  MenuItem,
  MenuList,
  Theme,
  Typography,
} from "@material-ui/core";
import { ExpandLess, ExpandMore, ViewList } from "@material-ui/icons";
import React from "react";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: "100%",
  },
  nested: {
    paddingLeft: theme.spacing(3),
  },
  listItem: {
    justifyContent: "center",
  },
  badgeIcon: {
    position: "relative",
    top: "50% !important",
  },
  linkItem: {
    textDecoration: "none",
    color: "inherit",
  }, centerDownMd:{
    [theme.breakpoints.down('md')]: {
      justifyContent:'center'
    }
  }
}));
export default function Orders() {
  const [open, setOpen] = React.useState<boolean>(true);
  const classes = useStyles();

  const handleCollapse = (e: React.MouseEvent) => {
    setOpen(!open);
  };

  return (
    <React.Fragment>
      <MenuList>
        <MenuItem className={classes.centerDownMd} onClick={handleCollapse}>
          <ListItemIcon>
            <ViewList fontSize="small" />
          </ListItemIcon>
          <Typography variant="inherit">مدیریت سفارشات</Typography>
          <ListItemIcon style={{ position: "relative", top: "2px !important" }}>
            {open ? <ExpandLess /> : <ExpandMore />}
          </ListItemIcon>
        </MenuItem>

        <Collapse in={open} timeout={500} unmountOnExit>
          <Divider />
          <List component="div" disablePadding>
            <MenuItem className={classes.centerDownMd}>
              <ListItemIcon className={classes.listItem}>
                <ViewList fontSize="small" />
              </ListItemIcon>
              <Typography variant="inherit">لیست سفارشات</Typography>
              <ListItemIcon style={{ marginRight: "48px" }}>
                <Badge
                  className={classes.badgeIcon}
                  badgeContent={1000}
                  max={999}
                  color="secondary"
                />
              </ListItemIcon>
            </MenuItem>
          </List>
        </Collapse>
      </MenuList>
    </React.Fragment>
  );
}
