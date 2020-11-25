import { FETCH_CUSTOMER_REQUEST, FETCH_CUSTOMER_SUCCESS, FETCH_CUSTOMER_FAILURE } from './customerTypes';
import axios from "axios";
import { URLSERVER } from '../../environment';

export const fetchCustomers = () => {
    return (dispatch) => {
      dispatch(fetchCustomerRequest())
      axios
        .get(`${URLSERVER}customers`, {
            headers: {
              "x-access-token": "Bearer " + sessionStorage.getItem("token"),
            },
          })
        .then(response => {
          const customers = [];
          response.data.map((customer) => {
            if(!customer.deleted) {
              customers.push(customer)
            }
          });
          dispatch(fetchCustomersSuccess(customers))
        })
        .catch(error => {
          dispatch(fetchCustomersFailure(error.message))
        })
    }
  }

export const fetchCustomerRequest = () => {
    return {
      type: FETCH_CUSTOMER_REQUEST
    }
}

export const fetchCustomersSuccess = customers => {
    return {
      type: FETCH_CUSTOMER_SUCCESS,
      payload: customers
    }
  }
  
  export const fetchCustomersFailure = error => {
    return {
      type: FETCH_CUSTOMER_FAILURE,
      payload: error
    }
  }