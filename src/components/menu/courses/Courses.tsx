import {
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
import {
  Send,
  ExpandLess,
  ExpandMore,
  AllInbox,
  Add,
  Category,
} from "@material-ui/icons";
import React from "react";
import { Link } from "react-router-dom";

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
  linkItem: {
    textDecoration: 'none',
    color: 'inherit'
  },
  centerDownMd:{
    [theme.breakpoints.down('md')]: {
      justifyContent:'center'
    }
  }
}));
export default function Courses(props:any) {
  const [open, setOpen] = React.useState<boolean>(true);
  const classes = useStyles();

  const handleCollapse = (e: React.MouseEvent) => {
    setOpen(!open);
  };

  return (
    <React.Fragment>
      <MenuList >
        <MenuItem className={classes.centerDownMd} onClick={handleCollapse}>
          <ListItemIcon>
            <Send fontSize="small" />
          </ListItemIcon>
          <Typography variant="inherit">مدیریت دوره ها</Typography>
          <ListItemIcon style={{ position: "relative", top: "2px !important" }}>
            {open ? <ExpandLess /> : <ExpandMore />}
          </ListItemIcon>
        </MenuItem>

        <Collapse in={open} timeout={500} unmountOnExit>
          <Divider />
          <List component="div" disablePadding>
            <Link className={classes.linkItem} to='/courses'>
              <MenuItem className={classes.centerDownMd}>
                <ListItemIcon className={classes.listItem}>
                  <AllInbox fontSize="small" />
                </ListItemIcon>
                <Typography variant="inherit">لیست دوره ها</Typography>
              </MenuItem>
            </Link>
            <Divider />
            <MenuItem className={classes.centerDownMd}>
              <ListItemIcon className={classes.listItem}>
                <Add fontSize="small" />
              </ListItemIcon>
              <Typography variant="inherit">دوره جدید</Typography>
            </MenuItem>
            <Divider />
            <MenuItem className={classes.centerDownMd}>
              <ListItemIcon className={classes.listItem}>
                <Category fontSize="small" />
              </ListItemIcon>
              <Typography variant="inherit">دسته بندی ها</Typography>
            </MenuItem>
            <Divider />
            <MenuItem className={classes.centerDownMd}>
              <ListItemIcon className={classes.listItem}>
                <Add fontSize="small" />
              </ListItemIcon>
              <Typography variant="inherit">دسته بندی جدید</Typography>
            </MenuItem>
            <Divider />
            <MenuItem className={classes.centerDownMd}>
              <ListItemIcon className={classes.listItem}>
                <Add fontSize="small" />
              </ListItemIcon>
              <Typography variant="inherit">پیشنهاد های ویژه</Typography>
            </MenuItem>
          </List>
        </Collapse>
      </MenuList>
    </React.Fragment>
  );
}
