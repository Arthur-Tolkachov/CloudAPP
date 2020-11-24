import {Dispatch} from "redux";
import {searchAPI} from "../api/api";
import {SearchDataType} from "./searchReducerTypes";



const initialState:Array<SearchDataType> = []

type ActionType = searchActionType | ResetSearchReducerType

const searchReducer = (state = initialState, action:ActionType) => {
    switch(action.type) {
        case "SEARCH-ACTION": {
            return [...action.data]
        }
        case 'RESET-SEARCH-REDUCER': {
            return []
        }
        default: return state
    }
}

export const resetSearchReducer = () => ({type: 'RESET-SEARCH-REDUCER'} as const)
type ResetSearchReducerType = ReturnType<typeof resetSearchReducer>

const searchAction = (data:Array<SearchDataType>) => ({type: "SEARCH-ACTION", data} as const)
type searchActionType = ReturnType<typeof searchAction>

export const getSearchResult = (value:string) => (dispatch: Dispatch) => {
    searchAPI.getSearch(value).then(response => {
        dispatch(searchAction(response.data.list))
    })
}


export default searchReducer;