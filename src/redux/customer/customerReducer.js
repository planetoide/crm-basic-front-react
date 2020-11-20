import {FETCH_CUSTOMER_REQUEST, FETCH_CUSTOMER_SUCCESS, FETCH_CUSTOMER_FAILURE } from './customerTypes';


const initialState = {
    loading: false,
    customers: [],
    error: ''
}

const customerReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_CUSTOMER_REQUEST:
        return {
          ...state,
          loading: true
        }
      case FETCH_CUSTOMER_SUCCESS:
        return {
          loading: false,
          customers: action.payload,
          error: ''
        }
      case FETCH_CUSTOMER_FAILURE:
        return {
          loading: false,
          customers: [],
          error: action.payload
        }
      default: return state
    }
  }

  export default customerReducer