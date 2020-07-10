import axios from 'axios'
import {REGISTER_SUCCESS, REGISTER_FAIL, USER_LOADED, AUTH_ERROR, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT, CLEAR_PROFILE} from './types'
import { AsyncStorage} from 'react-native'
import setAuthToken from '../utils/setAuthToken'
import Toast from 'react-native-simple-toast';



//LOAD USER

export const loadUser = () => async dispatch => {
    try{
        const headers ={
            'x-auth-token' : await AsyncStorage.getItem('token')
        }
        
        const res = await axios.get('http://192.168.1.108:5000/api/auth',{
            headers:headers
        })
        // console.warn('USER LOADEDDDD', res.data)
        Toast.show("User Loaded", Toast.SHORT)
        dispatch({
            type: USER_LOADED,
            payload: res.data
        })
    }catch(err){
        console.warn(err.message)
        dispatch({
            type: AUTH_ERROR
        })
    }
}


//REGISTER USER
export const register = ({name,email,password}) => async dispatch => {
    const config = {
        headers: {
            'Content-Type' : 'application/json'
        }
    }

    const body = JSON.stringify({name,email,password})

    try{
        const res = await axios.post('http://192.168.1.108:5000/api/user',body, config)
        console.warn('Success',res.data.token)
        dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        })
        dispatch(loadUser())
        Toast.show("Registered Successfully", Toast.SHORT)
    }catch(err){
        Toast.show("Error", Toast.SHORT)
        const errors = err.response.data.errors
        if(errors){
            errors.forEach(error => Toast.show(JSON.stringify(error.message), Toast.SHORT))
        } 
        dispatch({
            type: REGISTER_FAIL
        })
    }
}


//LOGIN USER
export const login = ({email, password}) => async dispatch => {
    const config = {
        headers: {
            'Content-Type' : 'application/json'
        }
    }

    const body = JSON.stringify({email,password})

    try{
        const res = await axios.post('http://192.168.1.108:5000/api/auth',body,config)
        // console.warn('Login Success', res.data.token)
        AsyncStorage.setItem('token',JSON.stringify(res.data.token))
        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        })
        Toast.show("Logged In Successfully", Toast.SHORT)
        dispatch(loadUser())

    }catch(err){
        Toast.show('Invalid ID or Password', Toast.SHORT)
        const errors = err.response.data.errors
        if(errors){
            errors.forEach(error => dispatch(error.msg,'danger'))
        } 
        dispatch({
            type: LOGIN_FAIL
        })
    }
}

export const logout = () => dispatch => {

    // console.warn("LOGGING OUT")
    Toast.show("Logged Out Successfully", Toast.SHORT)
    dispatch({
        type : CLEAR_PROFILE
    })
    dispatch({
        type : LOGOUT
    })
}