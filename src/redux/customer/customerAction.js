import { GET_CUSTOMERS, ADD_CUSTOMER, DELETE_CUSTOMER, FETCH_CUSTOMER_REQUEST, FETCH_CUSTOMER_SUCCESS, FETCH_CUSTOMER_FAILURE } from './customerTypes';
import axios from "axios";

export const fetchCustomers = () => {
    return (dispatch) => {
      dispatch(fetchCustomerRequest())
      axios
        .get("http://localhost:8080/customers", {
            headers: {
              "x-access-token": "Bearer " + sessionStorage.getItem("token"),
            },
          })
        .then(response => {
          const customers = response.data
          dispatch(fetchUsersSuccess(customers))
        })
        .catch(error => {
          dispatch(fetchUsersFailure(error.message))
        })
    }
  }

export const fetchCustomerRequest = () => {
    return {
      type: FETCH_CUSTOMER_REQUEST
    }
}

export const fetchUsersSuccess = customers => {
    return {
      type: FETCH_CUSTOMER_SUCCESS,
      payload: customers
    }
  }
  
  export const fetchUsersFailure = error => {
    return {
      type: FETCH_CUSTOMER_FAILURE,
      payload: error
    }
  }