import React from 'react'
import { View, Text, AsyncStorage, Image, ImageBackground,ScrollView } from 'react-native'
import { Container, Header, Content, Card, CardItem, Icon, Right, Left, Button } from 'native-base';
import LinearGradient from 'react-native-linear-gradient'


const Top = ({navigation,profile : {status,company,location,website,social, githubusername, user:{name,avatar}}}) => {
    return (
        <>
        
        <ScrollView>
        <ImageBackground source={require('../../assets/Images/Code3.jpg')} style={{width:'100%', height:300}}>
        <View style={{alignItems:'flex-end'}}>
        <Button bordered rounded light 
        style={{width:'30%', justifyContent:'center'}}
        onPress={()=> navigation.navigate("EditProfile")}
        ><Text style={{color:"#FFFFFF"}}>Edit Profile</Text></Button>
        </View>
        <View style={{alignItems:'center'}}>
            <Image source={{uri: 'http:' + avatar}} style={{width:100, height:100, borderRadius:75, borderColor:'white',borderWidth:1, marginTop:10}}></Image>
            <Text style={{color:'white', fontSize:15, marginTop:20, textAlign:'center', fontWeight:'bold'}}>{name && name}</Text>
            <Text style={{color:'white', fontSize:15, marginTop:20, textAlign:'center', fontWeight:'bold'}}>{status} At {company}</Text>
            <Text style={{color:'white', fontSize:15, marginTop:20, textAlign:'center', fontWeight:'bold'}}>{location}</Text>
        </View>
    </ImageBackground>
        <View>
        <Card style={{marginBottom:10, paddingTop:10,borderWidth:0.5, borderRadius:10, marginRight:20, marginLeft:20}}>
            <CardItem style={{alignSelf:'center', marginBottom:5}}>   
                <Image style={{width:25, height:25, marginRight:5}} source={require('../../assets/Images/github.png')}/> 
            <Text style={{fontWeight:'bold', fontSize:15}}>GitHub Username</Text>
            </CardItem>
            <CardItem style={{alignSelf:'center'}}>
                <Text>{githubusername && githubusername}</Text>
            </CardItem>
        </Card>
       
        <View>
        {social && 
        <Card style={{marginBottom:10, paddingTop:10,borderWidth:0.5, borderRadius:10, marginRight:10, marginLeft:10}}>
        
        <CardItem style={{alignSelf:'center', marginBottom:10}}>
            <Text style={{fontWeight:'bold', fontSize:15}}>Social Links</Text>
        </CardItem>
        

        { social && social.facebook &&
        <CardItem>
            <Image style={{width:25, height:25, marginRight:5}} source={require('../../assets/Images/facebook.png')}/>
            <Text>Facebook</Text>
            <Right>
                <Text>{social && social.facebook}</Text>
            </Right>
        </CardItem>
        }
        { social && social.youtube &&
        <CardItem>   
        <Image style={{width:25, height:25, marginRight:5}} source={require('../../assets/Images/youtube.png')}/>
            <Text>Youtube</Text>
            <Right>
                <Text>{social && social.youtube}</Text>
            </Right>
            
        </CardItem>
        }
        { social && social.twitter &&
        <CardItem>
            <Image style={{width:20, height:20, marginRight:5}} source={require('../../assets/Images/twitter.png')}/>
            <Text>Twitter</Text>
            <Right>
                <Text>{social && social.twitter}</Text>
            </Right>
        </CardItem>
        }
        { social && social.linkedin &&
        <CardItem>
        <Image style={{width:20, height:20, marginRight:5}} source={require('../../assets/Images/linkedin.png')}/>
            <Text>LinkedIn</Text>
                <Right>
                    <Text>{social && social.linkedin}</Text>
                </Right>
        </CardItem>
        }
        { social && social.instagram && 
        <CardItem>
            <Image style={{width:25, height:25, marginRight:5}} source={require('../../assets/Images/instagram.png')}/>
            <Text>Instagram</Text>
            <Right>
                <Text>{social && social.instagram}</Text>
            </Right>
        </CardItem>
        }
        </Card>
        }
        </View>
                    
        </View>
        </ScrollView>
        </>
    
    )
}

export default Top