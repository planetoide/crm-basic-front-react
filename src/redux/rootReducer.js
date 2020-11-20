import { combineReducers } from 'redux'
import customerReducer from './customer/customerReducer'
import userReducer from './user/userReducer'

const rootReducer = combineReducers({
  customer: customerReducer,
  user: userReducer
})

export default rootReducer