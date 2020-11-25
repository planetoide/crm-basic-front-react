import axios from "axios";
import { FETCH_USER_FAILURE, FETCH_USER_REQUEST, FETCH_USER_SUCCESS } from "./userTypes";
import { URLSERVER } from '../../environment';

export const fetchUsers = () => {
  return (dispatch) => {
    dispatch(fetchUserRequest())
    axios
      .get(`${URLSERVER}users`, {
          headers: {
            "x-access-token": "Bearer " + sessionStorage.getItem("token"),
          },
        })
      .then(response => {
        const users = [];
        response.data.map((user) => {
          if(!user.deleted) {
            users.push(user)
          }
        });
        dispatch(fetchUsersSuccess(users))
      })
      .catch(error => {
        dispatch(fetchUsersFailure(error.message))
      })
  }
}

export const fetchUserRequest = () => {
    return {
      type: FETCH_USER_REQUEST
    }
}

export const fetchUsersSuccess =    users => {
    return {
      type: FETCH_USER_SUCCESS,
      payload: users
    }
  }
  
  export const fetchUsersFailure = error => {
    return {
      type: FETCH_USER_FAILURE,
      payload: error
    }
  }