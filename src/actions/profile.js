import axios from 'axios'
import {GET_PROFILE, PROFILE_ERROR, UPDATE_PROFILE, CLEAR_PROFILE, DELETE_ACCOUNT, GET_PROFILES} from './types'
import {AsyncStorage} from 'react-native'
import Toast from 'react-native-simple-toast';


export const getCurrentProfile = () => async dispatch => {
    try{
        const headers ={
            'x-auth-token' : await AsyncStorage.getItem('token')
        }
        const res = await axios.get('http://192.168.1.108:5000/api/profile/me',{
            headers:headers
        })
        Toast.show("Profile Loaded", Toast.SHORT)
        console.warn('PROFILE LOADEDDD',res.data)
        dispatch({
            type: GET_PROFILE,
            payload: res.data
        })
    }catch(err){
        Toast.show("Error", Toast.SHORT)
        console.warn(err.message)
        dispatch({
            type : PROFILE_ERROR,
            payload : {msg: err.response.statusText, status: err.response.status}
        })
    }
}

export const createProfile = (formData, edit = false) => async dispatch => {
    try{ 
            const headers={
                'Content-Type' : 'application/json',
                'x-auth-token' : await AsyncStorage.getItem('token')
            }

        const res = await axios.post('http://192.168.1.108:5000/api/profile/', formData,{
            headers:headers
        })
        // console.warn('PROFILLEEE CREATEDDDDD', res.data)
        // console.warn(edit ? 'Profile updated' : 'Profile Created')
        Toast.show(edit ? 'Profile updated' : 'Profile Created', Toast.SHORT)
        dispatch({
            type: GET_PROFILE,
            payload: res.data
        })
        // dispatch(setAlert(edit ? 'Profile Updated' : 'Profile Created', 'success'))
        // if(!edit){
        //     history.push('/dashboard')
        // }
    }catch(err){
        Toast.show("Error", Toast.SHORT)
        const errors = err.response.data.errors
        if(errors){
            errors.forEach(error => dispatch(setAlert(error.msg,'danger')))
        } 

        dispatch({
            type : PROFILE_ERROR,
            payload : {msg: err.response.statusText, status: err.response.status}
        })
    }
}

export const addExperience = (formData) => async dispatch => {
    try{
        const headers={
            'Content-Type' : 'application/json',
            'x-auth-token' : await AsyncStorage.getItem('token')
        }

        const res = await axios.put('http://192.168.1.108:5000/api/profile/experience', formData,{
            headers:headers
        })
        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        })
        // console.warn('Experience ADDEDDDDDDD')
        Toast.show("Experience Added", Toast.SHORT)

    }catch(err){
        Toast.show("Error", Toast.SHORT)
        const errors = err.response.data.errors
        if(errors){
            errors.forEach(error => console.warn(error))
        } 

        dispatch({
            type : PROFILE_ERROR,
            payload : {msg: err.response.statusText, status: err.response.status}
        })
    }
}


export const addEducation = (formData) => async dispatch => {
    try{
        const headers={
            'Content-Type' : 'application/json',
            'x-auth-token' : await AsyncStorage.getItem('token')
        }

        const res = await axios.put('http://192.168.1.108:5000/api/profile/education', formData,{
            headers:headers
        })
        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        })
        // console.warn('EDUCATIONNN ADDEDDDDDDD')
        Toast.show("Education Added", Toast.SHORT)
        
    }catch(err){
        Toast.show("Error", Toast.SHORT)
        const errors = err.response.data.errors
        if(errors){
            errors.forEach(error => console.warn(error))
        } 

        dispatch({
            type : PROFILE_ERROR,
            payload : {msg: err.response.statusText, status: err.response.status}
        })
    }
}

export const getProfiles = () => async dispatch => {
    dispatch({
        type: CLEAR_PROFILE
    })
    try{
        const res = await axios.get('http://192.168.1.108:5000/api/profile')
        dispatch({
            type: GET_PROFILES,
            payload: res.data
        })
        dispatch(getCurrentProfile())
        // console.warn('PROFILESSSSSSS',res.data)
        Toast.show("Developers Loaded", Toast.SHORT)
    }catch(err){
        Toast.show("Error", Toast.SHORT)
        dispatch({
            type : PROFILE_ERROR,
            payload : {msg: err.response.statusText, status: err.response.status}
        })
    }
}


export const getProfileById = userId => async dispatch => {
    try{
        const res = await axios.get(`http://192.168.1.108:5000/api/profile/user/${userId}`)
        dispatch({
            type: GET_PROFILE,
            payload: res.data
        })
        Toast.show("Profile Loaded", Toast.SHORT)
        // console.warn("USERRRRRRRRRR FOUND", res.data)
    }catch(err){
        Toast.show("Error", Toast.SHORT)
        console.warn(err)
        dispatch({
            type : PROFILE_ERROR
        })
    }
}

export const deleteExperience = id => async dispatch => {
    try{
        const headers={
            'Content-Type' : 'application/json',
            'x-auth-token' : await AsyncStorage.getItem('token')
        }
        const res = await axios.delete(`http://192.168.1.108:5000/api/profile/experience/${id}`,{
            headers:headers
        })
        dispatch({
            type: UPDATE_PROFILE,
            payload : res.data
        })

        Toast.show("Experience Deleted", Toast.SHORT)
    }catch(err){
        Toast.show("Error", Toast.SHORT)
        console.warn(err)
        dispatch({
            type : PROFILE_ERROR
        })
    }
}


export const deleteEducation = id => async dispatch => {
    try{
        const headers={
            'Content-Type' : 'application/json',
            'x-auth-token' : await AsyncStorage.getItem('token')
        }
        const res = await axios.delete(`http://192.168.1.108:5000/api/profile/education/${id}`,{
            headers:headers
        })
        dispatch({
            type: UPDATE_PROFILE,
            payload : res.data
        })

        Toast.show("Delete Education", Toast.SHORT)
    }catch(err){
        Toast.show("Error", Toast.SHORT)
        dispatch({
            type : PROFILE_ERROR
        })
    }
}






