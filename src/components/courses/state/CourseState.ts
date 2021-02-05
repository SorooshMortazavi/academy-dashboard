import IActionType from "../../contracts/IActionType";
import levelStatus from "./levelStatus";
import ACTIONS_TYPE from "./COURSE_ACTIONS_TYPES";

export interface ICourseState {
  title: string;
  masterId: string;
  categoryId: string;
  level: number;
  description: string;
  sections: any[];
  isFree: boolean;
  formError: Map<string, string>;
}

export const initState = {
  title: "",
  masterId: "",
  categoryId: "",
  level: levelStatus.BEGINNER,
  description: "",
  sections: [],
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
    case ACTIONS_TYPE.DELETE_SECTION:
      newState = {
        ...state,
        sections: state.sections.filter((section =>{
          return section.slug !== action.payload.slug
        }))
      };
      break;
    case ACTIONS_TYPE.ADD_SECTION:
      newState = {
        ...state,
        sections: [...state.sections, action.payload.section],
      };
      break;
    case ACTIONS_TYPE.SET_LEVEL:
      newState = {
        ...state,
        level: action.payload.level,
      };
      break;
    case ACTIONS_TYPE.SET_MASTER:
      newState = {
        ...state,
        masterId: action.payload.masterId,
      };
      break;
    case ACTIONS_TYPE.SET_CATEGORY:
      newState = {
        ...state,
        categoryId: action.payload.categoryId,
      };
      break;
    case ACTIONS_TYPE.SET_IS_FREE:
      newState = {
        ...state,
        isFree: action.payload.isFree,
      };
      break;
    default:
      throw new Error("this action type does not exist in this system.");
  }
  return newState;
};
