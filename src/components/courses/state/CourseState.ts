import IActionType from "../../contracts/IActionType";
import levelStatus from "./levelStatus";
import ACTIONS_TYPE from "./COURSE_ACTIONS_TYPES";

export interface ICourseState {
  title: string;
  masterId: string;
  categoryId: string;
  level: number;
  description: string;
  isFree: boolean;
  formError: Map<string, string>;
}

export const initState = {
  title: "",
  masterId: "",
  categoryId: "",
  level: levelStatus.BEGINNER,
  description: "",
  isFree: false,
  formError: new Map<string, string>(),
};

export const reducer = (state: ICourseState, action: IActionType) => {
  let newState = state;
  switch (action.type) {
    case ACTIONS_TYPE.UPDATE_TITLE:
      newState = {
        ...state,
        title: action.payload.data,
      };
      break;
    case ACTIONS_TYPE.UPDATE_DESCRIPTION:
        newState = {
            ...state,
            description: action.payload.data,
          };
      break;
    case ACTIONS_TYPE.SET_ERROR:
      newState = {
        ...state,
        formError: state.formError.set(
          action.payload.data[0],
          action.payload.data[1]
        ),
      };
      break;
    case ACTIONS_TYPE.DELETE_ERROR:
      newState.formError.delete(action.payload.data);
      newState = {
        ...state,
        formError: newState.formError,
      };
      break;
    default:
      throw new Error("this action type doesn`t exist in this system.");
  }
  return newState;
};
