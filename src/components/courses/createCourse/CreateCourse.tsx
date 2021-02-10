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
import { Add, Save } from "@material-ui/icons";
import React from "react";
import Content from "../../partials/Content";
import SubContent from "../../partials/SubContent";
import { useCourseContext } from "../context";
import COURSE_ACTIONS from "../state/COURSE_ACTIONS_TYPES";
import LEVEL_STATUS from "../state/levelStatus";
import AddSectionDialog from "./AddSectionDialog";
import SectionList from "./section";
import Http from "../../../services/Http";

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
  const [openDialog, setOpenDialog] = React.useState<boolean>(false);
  const { state, dispatch } = useCourseContext();
  const [categories, setCategories] = React.useState([]);
  const [masters, setMasters] = React.useState([]);
  const axiosHttp = React.useMemo(() => new Http(), []);
  const [isSubmitDisable, setIsSubmitDisable] = React.useState(true)
  // console.log(state);

  React.useEffect(() => {
    function getCategories() {
      axiosHttp
        .get("api/v1/category")
        .then((response: any) => {
          setCategories(response.data.categories);
        })
        .catch((err) => {
          //TODO: notify
        });
    }
    function getMasters() {
      axiosHttp
        .get("api/v1/master/summary")
        .then((response: any) => {
          setMasters(response.data.masters);
        })
        .catch((error) => {
          //TODO:notify
        });
    }
    getCategories();
    getMasters();
  }, []);

  function sendData(){
    let newState:any = state
    delete newState?.formError
    axiosHttp.post('api/v1/course/create',{
      data:JSON.stringify(newState)
    })
    .then(response => {
      console.log('sending was ok')
    })
    .catch(error => {
      console.log('sending failed')
    })
  }

  function handleDeleteSection(slug: string) {
    dispatch({
      type:COURSE_ACTIONS.DELETE_SECTION,
      payload:{
        slug:slug
      }
    })
  }
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

  function handleCloseDialog(e: any) {
    setOpenDialog(false);
  }
  function handleOkDialog(e: any, section: any) {
    dispatch({
      type: COURSE_ACTIONS.ADD_SECTION,
      payload: {
        section,
      },
    });
    setOpenDialog(false);
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
  function handleSubmitButtonDisable(){
   if(openDialog == false){
    if(state.categoryId && state.masterId && 
      state.description && !state.formError.size && state.level >= 0 && state.title && isSubmitDisable === true){
        setIsSubmitDisable(false)
      }else if(!(state.categoryId && state.masterId && 
        state.description && !state.formError.size && state.level >= 0 && state.title) && isSubmitDisable === false ){
          setIsSubmitDisable(true)
      }
   }
  }

  return (
    <Content title="ایجاد دوره جدید">
      {handleSubmitButtonDisable()}
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
                required={true}
                native
                value={state.masterId}
                onChange={(e)=>{
                  dispatch({
                    type:COURSE_ACTIONS.SET_MASTER,
                    payload:{
                      masterId:e.target.value
                    }
                  })
                }}
                inputProps={{
                  name: "استاد",
                  id: "filled-age-native-simple",
                }}
              >
                <option aria-label="None" value="" />
                {masters.map((master:any) => {
                  return  <option value={master.id}>{`${master.name} ${master.lastName}`}</option>
                })}
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
                value={state.categoryId}
                onChange={(e)=>{
                  dispatch({
                    type:COURSE_ACTIONS.SET_CATEGORY,
                    payload:{
                      categoryId:e.target.value
                    }
                  })
                }}
                inputProps={{
                  name: "دسته بندی",
                  id: "filled-age-native-simple",
                }}
              >
                <option aria-label="None" value="" />
                {categories.map((category:any) => {
                  return  <option value={category.id}>{category.title}</option>
                })}
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
                value={state.level}
                onChange={(e) => {
                  dispatch({
                    type: COURSE_ACTIONS.SET_LEVEL,
                    payload: {
                      level: e.target.value,
                    },
                  });
                }}
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
              checked={state.isFree}
              // value={state.isFree}
              onChange={(e) => {
                console.log(e)
                dispatch({
                  type:COURSE_ACTIONS.SET_IS_FREE,
                  payload:{
                    isFree:e.target.checked
                  }
                })
              }}
              name="isFree"
              color="primary"
            />
          }
          label="این دوره رایگان است"
        />
      </div>
      <SubContent title=" اضافه کردن سر فصل های دوره">
        <Button
          variant="contained"
          color="secondary"
          size="medium"
          onClick={(e) => setOpenDialog(true)}
          startIcon={<Add />}
        >
          اضافه کردن سر فصل
        </Button>

        <AddSectionDialog
          open={openDialog}
          handleClose={handleCloseDialog}
          handleOk={handleOkDialog}
        />
        <SectionList
          sections={state.sections}
          handleDelete={handleDeleteSection}
        />
      </SubContent>
      <div className="d-flex justify-content-end">
        <Button
          variant="contained"
          color="primary"
          disabled={isSubmitDisable}
          size="large"
          onClick={() => sendData()}
          className={`${classes.button} flex justify-self-end`}
          startIcon={<Save />}
        >
          ذخیره کردن
        </Button>
      </div>
    </Content>
  );
}
