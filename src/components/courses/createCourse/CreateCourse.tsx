import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  InputLabel,
  makeStyles,
  Select,
  TextField,
  Theme,
} from "@material-ui/core";
import createStyles from "@material-ui/core/styles/createStyles";
import { Save } from "@material-ui/icons";
import React from "react";
import Content from "../../partials/Content";
import { useCourseContext } from "../context";
import COURSE_ACTIONS from "../state/COURSE_ACTIONS_TYPES";
import LEVEL_STATUS from "../state/levelStatus";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      flexWrap: "wrap",
    },
    margin: {
      margin: theme.spacing(1),
    },
    withoutLabel: {
      marginTop: theme.spacing(3),
    },
    textField: {
      width: "25ch",
    },
    selectForm: {
      margin: theme.spacing(1),
      minWidth: "100%",
    },
    button: {
      margin: theme.spacing(1),
    },
  })
);

export default function CreateCourse() {
  const classes = useStyles();
  const { state, dispatch } = useCourseContext();
  console.log(state);

  function deleteError(errorName: string) {
    dispatch({
      type: COURSE_ACTIONS.DELETE_ERROR,
      payload: {
        data: errorName,
      },
    });
  }

  function handleTitleError(e: any) {
    if (e.target.value.length < 6) {
      dispatch({
        type: COURSE_ACTIONS.SET_ERROR,
        payload: {
          data: ["title", "طول عنوان باید بیشتر از 6 کاراکتر باشد."],
        },
      });
    } else {
      deleteError("title");
    }
  }

  function handleDescriptionError(e: any) {
    if (e.target.value.length < 50) {
      dispatch({
        type: COURSE_ACTIONS.SET_ERROR,
        payload: {
          data: ["description", "توضیحات حداقل باید 50 کاراکتر باشد."],
        },
      });
    } else {
      deleteError("description");
    }
  }

  return (
    <Content title="ایجاد دوره جدید">
      <FormControl fullWidth className={classes.margin} variant="outlined">
        <TextField
          variant="filled"
          label="عنوان دوره"
          id="input-course-title"
          value={state.title}
          error={state.formError.has("title")}
          helperText={state.formError.get("title")}
          onChange={(e) => {
            dispatch({
              type: COURSE_ACTIONS.UPDATE_TITLE,
              payload: {
                data: e.target.value,
              },
            });
            handleTitleError(e);
          }}
        />
      </FormControl>
      <FormControl fullWidth className={classes.margin} variant="outlined">
        <TextField
          variant="filled"
          label="توضیحات دوره"
          id="input-course-description"
          multiline
          rows={3}
          value={state.description}
          error={state.formError.has("description")}
          helperText={state.formError.get("description")}
          onChange={(e) => {
            dispatch({
              type: COURSE_ACTIONS.UPDATE_DESCRIPTION,
              payload: {
                data: e.target.value,
              },
            });
            handleDescriptionError(e);
          }}
        />
      </FormControl>
      <div className="container p-0">
        <div className="row">
          <div className="col-md-4">
            <FormControl variant="filled" className={classes.selectForm}>
              <InputLabel htmlFor="filled-age-native-simple">استاد</InputLabel>
              <Select
                native
                value={state.masterId}
                // onChange={handleChange}
                inputProps={{
                  name: "استاد",
                  id: "filled-age-native-simple",
                }}
              >
                <option aria-label="None" value="" />
                <option value={10}>Ten</option>
                <option value={20}>Twenty</option>
                <option value={30}>Thirty</option>
              </Select>
            </FormControl>
          </div>
          <div className="col-md-4">
            <FormControl variant="filled" className={classes.selectForm}>
              <InputLabel htmlFor="filled-age-native-simple">
                دسته بندی
              </InputLabel>
              <Select
                native
                value={state.masterId}
                // onChange={handleChange}
                inputProps={{
                  name: "دسته بندی",
                  id: "filled-age-native-simple",
                }}
              >
                <option aria-label="None" value="" />
                <option value={10}>Ten</option>
                <option value={20}>Twenty</option>
                <option value={30}>Thirty</option>
              </Select>
            </FormControl>
          </div>
          <div className="col-md-4">
            <FormControl variant="filled" className={classes.selectForm}>
              <InputLabel htmlFor="filled-age-native-simple">
                سطح دوره
              </InputLabel>
              <Select
                native
                value={state.masterId}
                // onChange={handleChange}
                inputProps={{
                  name: "level",
                  id: "filled-age-native-simple",
                }}
              >
                <option aria-label="None" value="" />
                <option value={LEVEL_STATUS.BEGINNER}>مبتدی</option>
                <option value={LEVEL_STATUS.INTERMEDIATE}>متوسط</option>
                <option value={LEVEL_STATUS.ADVANCED}>پیشرفته</option>
              </Select>
            </FormControl>
          </div>
        </div>
      </div>
      <div className="p-2">
        <FormControlLabel
          control={
            <Checkbox
              checked={true}
              onChange={() => {}}
              name="isFree"
              color="primary"
            />
          }
          label="این دوره رایگان است"
        />
      </div>
      <div className="d-flex justify-content-end">
        <Button
          variant="contained"
          color="primary"
          size="large"
          className={`${classes.button} flex justify-self-end`}
          startIcon={<Save />}
        >
          ذخیره کردن
        </Button>
      </div>
    </Content>
  );
}
