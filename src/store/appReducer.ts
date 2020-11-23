import {CommonStateType} from "./appReducerTypes";

type ActionType = SetMessageType
const initialState:CommonStateType = {
    error: false,
    message: "",
    show: false
}
const appReducer = (state = initialState, action: ActionType) => {
    switch(action.type) {
        case "SET-MESSAGE": {
            return {...action.data}
        }
        default: return state
    }
}

export const setMessage = (error:boolean, message:string, show:boolean) => ({type: 'SET-MESSAGE', data:{error, message, show}} as const)
type SetMessageType = ReturnType<typeof setMessage>

export default appReducer;