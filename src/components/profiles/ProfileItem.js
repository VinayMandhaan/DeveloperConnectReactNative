import React from 'react'
import {View, ImageBackground,Image} from 'react-native'
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Icon, Left, Body, Right, Button } from 'native-base';

const ProfileItem = ({navigation,profile : {
    user :{_id, name, avatar},
    status,
    company,
    location,
    skills
}}) => {
    return (
          <Card style={{marginBottom:10, paddingTop:10,borderWidth:0.5, borderRadius:10, marginRight:20, marginLeft:20}}>
            <CardItem>
              <Left>
                <Thumbnail source={{uri: 'http:' + avatar}} />
                <Body>
                <Text>{name}</Text>
                <Text note>{status} {company && <Text note style={{fontWeight:'bold'}}> at {company}</Text>}</Text>
                <Text note style={{marginTop:10}}>{skills.slice(0,4).map((skill, index)=> (
                    
                    <Text note key={index} style={{fontWeight:'bold'}}>{skill + ', '}</Text>
                    
                ))}</Text>
                </Body>
              </Left>
            </CardItem>
            {/* <CardItem cardBody style={{alignSelf:'center'}}> 
            {skills.slice(0,4).map((skill, index)=> (
                    
                    <Text note key={index}>{skill + ', '}</Text>
                    
                ))}
            </CardItem> */}
            <CardItem>
              <Left>
                <Image style={{width:20, height:25}} source={require('../../assets/Images/Location.png')}/>
                <Text note>{location}</Text>
              </Left>
              <Right>
              <Button dark rounded onPress={()=>navigation.navigate('Profile',{
                  id:{_id}
              })}><Text style={{display:'flex',textAlign:'center', color:'white', fontWeight:'bold',fontSize:12}}>View Profile</Text></Button>
              </Right>
            </CardItem>
          </Card>
)









        // <View>
        //     <View>
        //         <Text>{name}</Text>
        //         <Text>{status} {company && <Text> at {company}</Text>}</Text>
        //         {/* <p className="my-1">{location && <span>{location}</span>}</p> */}
        //         {/* <Link to={`/profile/${_id}`} className="btn btn-primary">View Profile</Link> */}
        //     </View>
        //     <View>
        //         {skills.slice(0,4).map((skill, index)=> (
        //             <Text key={index}>{skill}</Text>
        //         ))}
        //     </View>
        // </View>
    
}



export default ProfileItem