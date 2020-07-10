import React, {useState} from 'react';
import {connect} from 'react-redux'
import {login} from '../actions/auth'
import PropTypes from 'prop-types'
import axios from 'axios'

import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  ImageBackground,
  StatusBar,
  TouchableOpacity,
  TextInput,
} from 'react-native';

import {Button, Item, Input, Icon} from 'native-base'
  


class Login extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            email: 'Test@gmail.com',
            password: 'Vinay.123'
        }
    }
    onSubmit = async() => {
        const {email,password} = this.state
        const newUser={
                email,password
        }
        this.props.login({email,password})
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
                    <Text style={{display:'flex',textAlign:'center', color:'white', fontWeight:'bold',fontSize:25, marginTop:30}}>Login</Text>
                    <View style={{ borderBottomColor:'white',borderBottomWidth: 2, width:120, alignSelf:'center', marginTop:10}}></View>
                </View>
            </View>
            <View>
            <Item rounded style={{marginBottom:30}}>
            <Input style={{textAlign:'center',fontSize:12, color:'white'}} placeholder="Email"  value={this.state.email}
            onChangeText={(email) => this.setState({ email })} placeholderTextColor={'white'}/>
            </Item>
            <Item rounded style={{marginBottom:30}}>
            <Input style={{textAlign:'center',fontSize:12, color:'white'}} placeholder="Password" secureTextEntry={true}  value={this.state.password}
            onChangeText={(password) => this.setState({ password })} placeholderTextColor={'white'}/>
            </Item>
            </View>
            <View style={{alignItems:'center'}}>
                <Button onPress={()=>this.onSubmit()} style={{width:'80%',justifyContent:'center', borderColor:'red'}} dark rounded><Text style={{display:'flex',textAlign:'center', color:'white', fontWeight:'bold',fontSize:20,}}>Login</Text></Button>
            </View>
            <TouchableOpacity style={{marginTop:10}} onPress={()=>{this.props.navigation.navigate('SignUp')}}>
            <Text style={{color:'white', textAlign:'center'}}>Don't Have An Account? <Text style={{fontWeight:'bold'}}>SignUp</Text></Text>
            </TouchableOpacity>
            </ImageBackground>
        )
    }
}

const mapStateToProps = state => ({
    isAuthenticated : state.auth.isAuthenticated
})

export default connect(mapStateToProps,{login})(Login);