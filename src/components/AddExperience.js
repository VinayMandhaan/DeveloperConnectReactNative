import React, {useEffect} from 'react'
import { View, Text, AsyncStorage, Image, ImageBackground, TextInput, CheckBox } from 'react-native'
import {connect} from 'react-redux'
import {addExperience} from '../actions/profile'
import { Container, Header, Content, Card, CardItem, Icon, Right, Button, DatePicker, Input, Item } from 'native-base';
import { ScrollView } from 'react-native-gesture-handler';



class AddExperience extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            company : '',
            title: '',
            location: '',
            from : '',
            to: '',
            current: false,
            description: '',
            toDateDisabled:false,
            toggleDisabled:false,
        }
        this.setFromDate = this.setFromDate.bind(this);
        this.setToDate = this.setToDate.bind(this);
    }
    onSubmit = () => {
        const {
            company,
            title,
            location,
            from,
            to,
            current,
            description
        } = this.state
        const formData = {
            company,
            title,
            location,
            from,
            to,
            current,
            description
        }

        this.props.addExperience(formData)
    }
    setFromDate(newDate) {
        this.setState({ from: newDate });
    }
    setToDate(newDate){
        if(this.state.current == true){
            this.setState({
                to:null
            })
        }else{
            this.setState({
                to:newDate
            })
        }} 
    
    render(){ 
        return(
            <View>
                <ScrollView>
            <ImageBackground source={require('../assets/Images/Code3.jpg')} style={{width:'100%', height:200, marginBottom:10}}>
            <View style={{display:'flex', textAlign:'center'}}>
                <View style={{marginTop:20, marginBottom:60}}>
                    <Text style={{display:'flex',textAlign:'center', color:'white', fontWeight:'bold', fontSize:40}}>Dev Connector.</Text>
                    <Text style={{display:'flex',textAlign:'center', color:'white', fontWeight:'bold',fontSize:10}}>Connect With Developers All Around The World.</Text>
                    <Text style={{display:'flex',textAlign:'center', color:'white', fontWeight:'bold',fontSize:25, marginTop:30}}>Add Your Job Experience.</Text>
                    <View style={{ borderBottomColor:'white',borderBottomWidth: 2, width:250, alignSelf:'center', marginTop:10}}></View>
                </View>
            </View>
            </ImageBackground>
                <Item rounded style={{marginBottom:20, width:'80%',alignSelf:'center'}}>
                    <Input style={{textAlign:'center',fontSize:12, color:'black', fontWeight:'bold'}} 
                    placeholder="Company" value={this.state.company} 
                    onChangeText={(company) => this.setState({ company })}
                    placeholderTextColor={'black'}
                    />
                </Item>
                <Item rounded style={{marginBottom:20, width:'80%',alignSelf:'center'}}>
                    <Input style={{textAlign:'center',fontSize:12, color:'black', fontWeight:'bold'}}
                    placeholder="Title" value={this.state.title} 
                    onChangeText={(title) => this.setState({ title })}
                    placeholderTextColor={'black'}
                    />
                </Item>
                <Item rounded style={{marginBottom:20, width:'80%',alignSelf:'center'}}>
                    <Input style={{textAlign:'center',fontSize:12, color:'black', fontWeight:'bold'}}
                    placeholder="Location" value={this.state.location} 
                    onChangeText={(location) => this.setState({ location })}
                    placeholderTextColor={'black'}/>
                </Item>
                <Item rounded style={{marginBottom:20, width:'80%',alignSelf:'center'}}>
                    <Input style={{textAlign:'center',fontSize:12, color:'black', fontWeight:'bold'}}
                    placeholder="Description" value={this.state.description} 
                    onChangeText={(description) => this.setState({ description })}
                    placeholderTextColor={'black'}/>
                </Item>

                <View style={{borderWidth:0.5, borderRadius:10, marginRight:20, marginLeft:20}}>
                <Text style={{textAlign:'center', marginBottom:10, fontWeight:'bold'}}>From</Text>
                <Item style={{marginBottom:20, width:'80%',alignSelf:'center'}}>
                    <DatePicker  onDateChange={this.setFromDate}/>
                </Item>
                <Text style={{textAlign:'center', marginBottom:10, fontWeight:'bold'}}>Currently Working?</Text>
                <Item style={{marginBottom:20, width:'80%',alignSelf:'center'}}>
                <CheckBox value={this.state.current} onValueChange={() => this.setState({ current: !this.state.current, toDateDisabled:!this.state.toDateDisabled })}/>
                </Item>
                <Text style={{textAlign:'center', marginBottom:10, fontWeight:'bold'}}>To</Text>
                <Item style={{marginBottom:20, width:'80%',alignSelf:'center'}}>
                    <DatePicker disabled={this.state.toDateDisabled} onDateChange={this.setToDate}/>
                </Item>
                </View>
                <View style={{alignItems:'center', marginBottom:10, marginTop:10}}>
                    <Button onPress={()=>this.onSubmit()} style={{width:'80%',justifyContent:'center', borderColor:'red'}} dark rounded><Text style={{display:'flex',textAlign:'center', color:'white', fontWeight:'bold',fontSize:20}}>Add</Text></Button>
                </View>
                </ScrollView>
            </View>
        )
    }
}


export default connect(null, {addExperience})(AddExperience)

