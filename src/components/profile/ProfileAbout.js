import React from 'react'
import { View, Text, AsyncStorage, Image, ImageBackground, Button,ScrollView } from 'react-native'
import { Container, Header, Content, Card, CardItem, Icon, Right, Left } from 'native-base';
import LinearGradient from 'react-native-linear-gradient'


const ProfileAbout = ({profile : {bio,skills,user:{name}}}) => {
    return (
        <>
        <ScrollView>
            
        { bio &&
        <Card style={{marginBottom:10, paddingTop:10,borderWidth:0.5, borderRadius:10, marginRight:20, marginLeft:20}}>
            <CardItem style={{alignSelf:'center', marginBottom:1}}>
            <Image style={{width:25, height:25, marginRight:5}} source={require('../../assets/Images/bio.png')}/>   
            <Text style={{fontWeight:'bold', fontSize:15}}>Bio</Text>
            </CardItem>
            
            <CardItem style={{alignSelf:'center'}}>
                <Text>{bio}</Text>
            </CardItem>
            
        </Card>
        }
        
        <Card style={{marginBottom:10, paddingTop:10,borderWidth:0.5, borderRadius:10, marginRight:20, marginLeft:20}}>
            <CardItem style={{alignSelf:'center', marginBottom:1}}>
            <Image style={{width:25, height:25, marginRight:5}} source={require('../../assets/Images/Skill.png')}/>   
            <Text style={{fontWeight:'bold', fontSize:15}}>Skills</Text>
            </CardItem>
            <CardItem style={{alignSelf:'center'}}>
            {
                  skills.map((skill,index)=>(
                      <View key={index} className="p-1">
                          <Text>{skill},</Text>
                      </View>
                  ))
              }
            </CardItem>
        </Card>
        </ScrollView>
        </>
    
    )
}

export default ProfileAbout