import React,{useReducer,createContext,Dispatch} from "react";
import { reducer, initState, ICourseState } from "../state/CourseState";
import IAction from '../../contracts/IActionType';

interface ICourseContext {
    state:ICourseState,
    dispatch:Dispatch<IAction>
}

const Context = createContext<ICourseContext>({} as ICourseContext)

export default function index({children}:React.PropsWithChildren<{}>) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [state, dispatch] = useReducer(reducer, initState);
  return (
    <Context.Provider value={{state,dispatch}}>
        {children}
    </Context.Provider>
  );
}

export const useCourseContext = ():ICourseContext => {
 return React.useContext(Context)
}