/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState} from 'react';
import {connect} from 'react-redux'
import {register} from '../actions/auth'
import PropTypes from 'prop-types'
import {Images} from '../theme/Images'
import axios from 'axios'

import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TextInput,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';

import {Button, Item, Input} from 'native-base'

class SignUp extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            name: '',
            email: '',
            password: ''
        }
    }
    onSubmit = async() => {
        const {name,email,password} = this.state
        const newUser={
                name,email,password
        }
        this.props.register({name,email,password})
    }
    render () {
        {
            this.props.isAuthenticated ? this.props.navigation.navigate('Home') : null
        }
        return (
            <ImageBackground source={require('../assets/Images/Code3.jpg')} style={{width:'100%', height:'100%'}}>
            <View style={{display:'flex', textAlign:'center'}}>
                <View style={{marginTop:60, marginBottom:70}}>
                    <Text style={{display:'flex',textAlign:'center', color:'white', fontWeight:'bold', fontSize:40}}>Dev Connector.</Text>
                    <Text style={{display:'flex',textAlign:'center', color:'white', fontWeight:'bold',fontSize:10}}>Connect With Developers All Around The World.</Text>
                    <Text style={{display:'flex',textAlign:'center', color:'white', fontWeight:'bold',fontSize:25, marginTop:30}}>SignUp</Text>
                    <View style={{ borderBottomColor:'white',borderBottomWidth: 2, width:120, alignSelf:'center', marginTop:10}}></View>
                </View>
            <View>
                <Item rounded style={{marginBottom:30}}>
                <Input style={{textAlign:'center',fontSize:12, color:'white'}} placeholder="Name"  value={this.state.name}
                onChangeText={(name) => this.setState({ name })} placeholderTextColor={'white'}/>
                </Item>
                <Item rounded style={{marginBottom:30}}>
                <Input style={{textAlign:'center',fontSize:12, color:'white'}} placeholder="Email"  value={this.state.email}
                onChangeText={(email) => this.setState({ email })} placeholderTextColor={'white'}/>
                </Item>
                <Item rounded style={{marginBottom:30}}>
                <Input style={{textAlign:'center',fontSize:12, color:'white'}} placeholder="Password" secureTextEntry={true}  value={this.state.password}
                onChangeText={(password) => this.setState({ password })} placeholderTextColor={'white'}/>
                </Item>
            <View style={{alignItems:'center'}}>
                <Button onPress={()=>this.onSubmit()} style={{width:'80%',justifyContent:'center', borderColor:'red'}} dark rounded><Text style={{display:'flex',textAlign:'center', color:'white', fontWeight:'bold',fontSize:20,}}>SignUp</Text></Button>
            </View>
            <TouchableOpacity style={{marginTop:10}} onPress={()=>{this.props.navigation.navigate('Login')}}>
            <Text style={{color:'white', textAlign:'center'}}>Already Have An Account? <Text style={{fontWeight:'bold'}}>SignIn</Text></Text>
            </TouchableOpacity>
            </View>
            </View>
            </ImageBackground>
        )
    }
}

const mapStateToProps = state => ({
    isAuthenticated : state.auth.isAuthenticated
})

export default connect(mapStateToProps,{register})(SignUp);