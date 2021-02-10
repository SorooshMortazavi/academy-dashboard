import IActionType from '../../contracts/IActionType'
import {VIDEO_ACTIONS} from './VIDEO_ACTIONS'

export interface IVideoState {
    videoNumber:number
    title:string
    courseId:string
    sectionId:string
    isFree:boolean
    description:string
    isVideoChoose:boolean
    courses:any[]
    sections:any[]
}

export const initState:IVideoState = {
    videoNumber:0,
    title:'',
    courseId:'',
    sectionId:'',
    isFree:false,
    description:'',
    isVideoChoose:false,
    courses:[],
    sections:[],
}

export const reducer = (store:IVideoState,action:IActionType):IVideoState => {
    let newStore:IVideoState={} as IVideoState
    switch (action.type) {
        case VIDEO_ACTIONS.ADD_COURSES:
            newStore={
                ...store,
                courses:action.payload.courses
            }
            break;
        case VIDEO_ACTIONS.CHANGE_IS_VIDEO_CHOOSE:
            newStore={
                ...store,
                isVideoChoose:action.payload.isVideoChoose
            }
            break;
        case VIDEO_ACTIONS.ADD_SECTION_ID:
            newStore={
                ...store,
                sectionId:action.payload.sectionId
            }
            break;
        case VIDEO_ACTIONS.CHANGE_IS_FREE:
            newStore={
                ...store,
                isFree:action.payload.isFree
            }
            break;
        case VIDEO_ACTIONS.ADD_TITLE:
            newStore={
                ...store,
                title:action.payload.title
            }
            break;
        case VIDEO_ACTIONS.ADD_DESCRIPTION:
            newStore={
                ...store,
                description:action.payload.description
            }
            break;
        case VIDEO_ACTIONS.ADD_VIDEO_NUMBER:
            const number = action.payload.videoNumber >= 0 ? action.payload.videoNumber : 0
            newStore={
                ...store,
                videoNumber:number
            }
            break;
        case VIDEO_ACTIONS.ADD_COURSE_ID:

            const sections = store.courses.filter((item) => (
                item.id === action.payload.courseId
            ))[0]?.sections

            newStore={
                ...store,
                courseId:action.payload.courseId,
                sections,
                sectionId:''
            }
            break;
    
        default:
            break;
    }
    return newStore
}