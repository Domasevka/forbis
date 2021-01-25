import { combineReducers } from 'redux'
import {
  REQUEST_PAGE, RECEIVE_PAGE, REQUEST_TABLE, RECEIVE_TABLE
} from '../actions'


const htmlDoc = (state = {
  isFetching: false,
  
  items: []
}, action) => {
  switch (action.type) {
    case REQUEST_PAGE:
      return {
        ...state,
        isFetching: true
        
      }
    case RECEIVE_PAGE:
      return {
        ...state,
        isFetching: false,
        items: action.htmlDoc,
        lastUpdated: action.receivedAt
      }
    default:
      return state
  }
}

const tableItems = (state = {
  isFetching: false,
  items: []
}, action) => {
  switch (action.type) {
    case REQUEST_TABLE:
      return {
        ...state,
        isFetching: true
      }
    case RECEIVE_TABLE:
      return {
        ...state,
        isFetching: false,
        tableItems: action.tableItems,
        lastUpdated: action.receivedAt
      }
    default:
      return state
  }
}

const htmlInfo = (state = { }, action) => {
  switch (action.type) {
    case RECEIVE_PAGE:
    case REQUEST_PAGE:
      return {
        ...state,
        htmlDocument: htmlDoc(state, action)
      }
    default:
      return state
  }
}

const tableInfo = (state = { }, action) => {
  switch (action.type) {
    case RECEIVE_TABLE:
    case REQUEST_TABLE:
      return {
        ...state,
        tableItems: tableItems(state, action)
      }
    default:
      return state
  }
}

const rootReducer = combineReducers({
  htmlInfo,
  tableInfo
})

export default rootReducer
