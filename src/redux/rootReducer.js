import { combineReducers } from 'redux'
import customerReducer from './customer/customerReducer'

const rootReducer = combineReducers({
  customer: customerReducer
})

export default rootReducer