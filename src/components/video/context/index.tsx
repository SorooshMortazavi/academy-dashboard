import React, { createContext } from 'react'
import IActionType from '../../contracts/IActionType'
import { IVideoState, reducer, initState } from '../state/VideoState'
interface IContext{
    store:IVideoState,
    dispatch:React.Dispatch<IActionType>
}

const Context = createContext<IContext>({} as IContext)
export default function Index(props:React.PropsWithChildren<{}>) {
    const [store, dispatch] = React.useReducer(reducer, initState)
    return (
        <Context.Provider value={{store,dispatch}}>
             {props.children}
        </Context.Provider>
    )
}

export const useVideoContext = () => {
    return React.useContext(Context)
}
