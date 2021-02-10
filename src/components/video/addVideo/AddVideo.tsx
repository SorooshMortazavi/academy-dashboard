import React, { useState, useEffect, useMemo } from "react";
import { useVideoContext } from "../context";
import VideoInput from "../../partials/VideoInput";
import {
  Button,
  FormControl,
  FormControlLabel,
  InputLabel,
  Select,
  TextField,
} from "@material-ui/core";
import Checkbox from "@material-ui/core/Checkbox";
import { Save } from "@material-ui/icons";
import LinearProgressWithLabel from "../../partials/LinearProgressWithLabel";
import AxiosHttp from "../../../services/Http";
import { VIDEO_ACTIONS } from "../state/VIDEO_ACTIONS";
export default function AddVideo() {
  const { store, dispatch } = useVideoContext();
  const [videoDuration, setVideoDuration] = useState(0);
  const [videoFile, setVideoFile] = useState<File>();
  const [progress, setProgress] = useState<number>(0);
  const axiosHttp = useMemo(() => new AxiosHttp(), []);
  const [isButtonDisable, setIsButtonDisable] = useState(true);
  const errors: Map<string, string> = useMemo(
    () => new Map<string, string>(),
    []
  );
  handleIsButtonDisable()
  console.log(store);

  useEffect(() => {
    function getCourses() {
      axiosHttp
        .get<any>("api/v1/course")
        .then((response) => {
          dispatch({
            type: VIDEO_ACTIONS.ADD_COURSES,
            payload: {
              courses: response.data.courses,
            },
          });
        })
        .catch((error) => {
          //TODO: notify
        });
    }
    if (store.courses.length === 0) {
      getCourses();
    }
  }, []);

  function handleVideoInput(file: File) {
    setVideoFile(file);
    dispatch({
      type: VIDEO_ACTIONS.CHANGE_IS_VIDEO_CHOOSE,
      payload: {
        isVideoChoose: true,
      },
    });
  }

  function handleDescriptionError(value: string) {
    if (value.length < 30 || value.length > 300) {
      errors.set("description", "طول توضیحات وارد شده مناسب نیست.");
    } else {
      errors.delete("description");
    }
  }
  function handleTitleError(value: string) {
    if (value.length < 5 || value.length > 40) {
      errors.set("title", "طول عنوان وارد شده مناسب نیست.");
    } else {
      errors.delete("title");
    }
  }
  function handleIsButtonDisable() {
    if (
      (store.courseId.length === 0 ||
      store.sectionId.length === 0 ||
      errors.has("description") ||
      errors.has("tittle") ||
      !store.isVideoChoose ||
      store.videoNumber === 0) && !isButtonDisable
    ) {
      setIsButtonDisable(true);
    } else if (
      !(store.courseId.length === 0) &&
      !(store.sectionId.length === 0) &&
      !errors.has("description") &&
      !errors.has("tittle") &&
      store.isVideoChoose &&
      !(store.videoNumber === 0)&&
      isButtonDisable
    ) {
        setIsButtonDisable(false);
    }
   
  }
  function handleSaveButtonClick(e:React.MouseEvent){
    const formData = new FormData()
    formData.append('videoNumber',store.videoNumber as unknown as string)
    formData.append('title',store.title)
    formData.append('duration',videoDuration as unknown as string)
    formData.append('courseId',store.courseId)
    formData.append('sectionId',store.sectionId)
    formData.append('isFree',store.isFree as unknown as string)
    formData.append('description',store.description)
    formData.append('videoFile',videoFile as Blob)
    axiosHttp.post<any>('api/v1/video/add',formData,{
        headers:{
            "Content-Type":"multipart/form-data"
        },
        onUploadProgress:(progress:any) => {
            setProgress((progress.loaded / (videoFile?.size || progress.loaded)) * 100)
        }
    })
  }
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <FormControl variant="filled" fullWidth>
              <InputLabel htmlFor="outlined-age-native-simple">
                انتخاب دوره
              </InputLabel>
              <Select
                native
                value={store.courseId}
                onChange={(e) => {
                  dispatch({
                    type: VIDEO_ACTIONS.ADD_COURSE_ID,
                    payload: { courseId: e.target.value },
                  });
                }}
                label="انتخاب دوره"
              >
                <option value={""}></option>
                {store.courses &&
                  store.courses.map((course) => {
                    return <option value={course.id}>{course.title}</option>;
                  })}
              </Select>
            </FormControl>
          </div>
          <div className="col-md-6">
            <FormControl variant="filled" fullWidth>
              <InputLabel htmlFor="outlined-age-native-simple">
                انتخاب سر فصل
              </InputLabel>
              <Select
                native
                value={store.sectionId}
                onChange={(e) => {
                  dispatch({
                    type: VIDEO_ACTIONS.ADD_SECTION_ID,
                    payload: {
                      sectionId: e.target.value,
                    },
                  });
                }}
                label="انتخاب سر فصل"
              >
                <option aria-label="None" value="" />
                {store.sections &&
                  store.sections?.map((section) => {
                    return <option value={section._id}>{section.title}</option>;
                  })}
              </Select>
            </FormControl>
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-md-6">
            <TextField
              fullWidth
              id="outlined-number"
              label="شماره ویدیو"
              type="number"
              value={store.videoNumber}
              onChange={(e) => {
                dispatch({
                  type: VIDEO_ACTIONS.ADD_VIDEO_NUMBER,
                  payload: {
                    videoNumber: e.target.value,
                  },
                });
              }}
              variant="filled"
            />
          </div>
          <div className="col-md-6 d-flex align-content-center">
            <FormControlLabel
              control={
                <Checkbox
                  checked={store.isFree}
                  onChange={(e) => {
                    dispatch({
                      type: VIDEO_ACTIONS.CHANGE_IS_FREE,
                      payload: {
                        isFree: !store.isFree,
                      },
                    });
                  }}
                  color="primary"
                />
              }
              label="این ویدیو رایگان است"
            />
          </div>
        </div>
        <div className="mt-2">
          <TextField
            id="filled-multiline-static"
            value={store.title}
            error={errors.has("title")}
            helperText={errors.get("title")}
            onChange={(e) => {
              dispatch({
                type: VIDEO_ACTIONS.ADD_TITLE,
                payload: {
                  title: e.target.value,
                },
              });
              handleTitleError(e.target.value);
            }}
            fullWidth
            label="عنوان ویدیو"
            variant="filled"
          />
        </div>
        <div className="row mt-3">
          <TextField
            id="filled-multiline-static"
            label="توضیحات ویدیو"
            value={store.description}
            error={errors.has("description")}
            helperText={errors.get("description")}
            onChange={(e) => {
              dispatch({
                type: VIDEO_ACTIONS.ADD_DESCRIPTION,
                payload: {
                  description: e.target.value,
                },
              });
              handleDescriptionError(e.target.value);
            }}
            multiline
            rows={4}
            defaultValue="Default Value"
            variant="filled"
          />
        </div>
        <div className="row mt-2 ">
          <VideoInput
            changeCallBack={handleVideoInput}
            setVideoDuration={setVideoDuration}
          ></VideoInput>
          {progress && <LinearProgressWithLabel value={progress} />}
        </div>
        <div className="row mt-3">
          <Button
            variant="contained"
            color="primary"
            disabled={isButtonDisable}
            size="large"
            onClick={handleSaveButtonClick}
            startIcon={<Save />}
          >
            ذخیره ویدیو
          </Button>
        </div>
      </div>
    </>
  );
}
