import { GET_USERS, ADD_USER, DELETE_USER } from './customerTypes';

export const getUsers = () => {
    return {
        type: GET_USERS
    }
}

export const addUser = () => {
    return {
        type: ADD_USER
    }
}

export const deleteUser = () => {
    return {
        type: DELETE_USER
    }
}