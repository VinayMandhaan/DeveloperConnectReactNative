import React, {useEffect} from 'react'
import { View, Text, AsyncStorage, Image, ImageBackground, BackHandler, Alert } from 'react-native'
import {connect} from 'react-redux'
import {getCurrentProfile} from '../../actions/profile'
import {deleteExperience} from '../../actions/profile'
import { Container, Header, Content, Card, CardItem, Icon, Right, Button } from 'native-base';
import LinearGradient from 'react-native-linear-gradient'
import Top from './Top'
import About from './About'
import Experience from './Experience'
import Education from './Education'
import { ScrollView } from 'react-native-gesture-handler';



class Home extends React.Component{
    constructor(props){
        super(props)
    }

    onBackButtonPressAndroid = () => {
        if (!this.props.navigation.isFocused()) {
          return false;
        }
        if (true) {
          Alert.alert('Hold on!', 'Are you sure you want to go back?', [
            {
              text: 'Cancel',
              onPress: () => null,
            },
            {
              text: 'Yes',
              onPress: () => BackHandler.exitApp(),
            },
          ]);
          return true;
        } else {
          return false;
        }
      };


    componentDidMount(){
        this.props.getCurrentProfile();
        this.backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            this.onBackButtonPressAndroid,
          );
    }

    componentWillUnmount(){
        BackHandler.removeEventListener(
            'hardwareBackPress',
            this.onBackButtonPressAndroid,
          );
    }

    render(){
        return(
           <View>
            <ScrollView>
            <ImageBackground source={require('../../assets/Images/Code3.jpg')} style={{width:'100%', height:150, marginBottom:10}}>
                <View style={{display:'flex', textAlign:'center'}}>
                <View style={{marginTop:20, marginBottom:60}}>
                    {/* <Text style={{display:'flex',textAlign:'center', color:'white', fontWeight:'bold', fontSize:40}}>Dev Connector.</Text>
                    <Text style={{display:'flex',textAlign:'center', color:'white', fontWeight:'bold',fontSize:10}}>Connect With Developers All Around The World.</Text> */}
                    <Text style={{display:'flex',textAlign:'center', color:'white', fontWeight:'bold',fontSize:25, marginTop:30}}>Welcome {this.props.auth.user && this.props.auth.user.name}.</Text>
                    <View style={{ borderBottomColor:'white',borderBottomWidth: 2, width:200, alignSelf:'center', marginTop:10}}></View>
                </View>
                </View>
            </ImageBackground>
            { this.props.profile.profile !=null ?
                <View style={{alignItems:'center', marginTop:80}}>
                <Button dark rounded 
                style={{width:'80%',justifyContent:'center', borderColor:'red',alignSelf:'center', marginBottom:20}}
                onPress={()=>this.props.navigation.navigate("MainProfile")}
                >
                <Text style={{display:'flex',textAlign:'center', color:'white', fontWeight:'bold',fontSize:15}}>Profile</Text>
                </Button>
                <Button dark rounded 
                style={{width:'80%',justifyContent:'center', borderColor:'red',alignSelf:'center', marginBottom:20}}
                onPress={()=>this.props.navigation.navigate("AddEducation")}
                >
                <Text style={{display:'flex',textAlign:'center', color:'white', fontWeight:'bold',fontSize:15}}>Add Education</Text>
                </Button>
                <Button dark rounded 
                style={{width:'80%',justifyContent:'center', borderColor:'red',alignSelf:'center'}}
                onPress={()=>this.props.navigation.navigate("AddExperience")}
                >
                <Text style={{display:'flex',textAlign:'center', color:'white', fontWeight:'bold',fontSize:15}}>Add Experience</Text>
                </Button>
                </View>
            : 
            <View style={{alignItems:'center', marginTop:80}}>
            <Text style={{fontWeight:'bold', fontSize:18}}>You Donot Have A Profile Yet.</Text>
            <Button onPress={()=>this.props.navigation.navigate("CreateProfile")} style={{width:'80%',justifyContent:'center', borderColor:'red', marginTop:20}} dark rounded><Text style={{display:'flex',textAlign:'center', color:'white', fontWeight:'bold',fontSize:20}}>Create Profile</Text></Button>
           </View>   
           }
            </ScrollView>
           </View>
        )
    } 
}





// const Home  = ({getCurrentProfile,auth: {user},profile: {profile,loading}, navigation}) => {
//     useEffect(()=>{
//         getCurrentProfile()
//     },[getCurrentProfile])
        
//     return(
//             <>
//                 <View>
//                     <ScrollView>
//                     {
//                         profile && 
//                         <ProfileTop profile={profile}/>
//                     }
//                     {
//                         profile && 
//                         <ProfileAbout profile={profile}/>
//                     }
//                     <Card>
//                         <CardItem style={{alignSelf:'center', marginBottom:1}}>
//                         <Image style={{width:25, height:25, marginRight:5}} source={require('../../assets/Images/experience.png')}/>   
//                         <Text style={{fontWeight:'bold', fontSize:15}}>Experience</Text>
//                     </CardItem>
//                     </Card>
        
//                     { profile &&  profile.experience.length > 0
//                       ? 
//                       ( <>
//                             {profile.experience.slice(0,2).map(experience => (
//                                 <ProfileExperience key={experience._id} experience={experience}/>
//                             ))}
//                     </>
//                     ) : <Text>No Experience Credentials</Text>}

//                     <Card>
//                         <CardItem style={{alignSelf:'center', marginBottom:1}}>
//                         <Image style={{width:25, height:25, marginRight:5}} source={require('../../assets/Images/education.png')}/>   
//                         <Text style={{fontWeight:'bold', fontSize:15}}>Education</Text>
//                     </CardItem>
//                     </Card>

                    
//                     { profile &&  profile.education.length > 0
//                       ? 
//                       ( <>
//                             {profile.education.slice(0,2).map(education => (
//                                 <ProfileEducation key={education._id} education={education}/>
//                             ))}
//                     </>
//                     ) : <Text>No Education Credentials</Text>}
//                     <Button title="String" onPress={()=>getCurrentProfile()}/>
//                     </ScrollView>
                    
//                 </View>

//             </>
            
//         )
    // }

const mapStateToProps = state => ({
    auth : state.auth,
    profile : state.profile

})




export default connect(mapStateToProps, {getCurrentProfile})(Home)




      {/* <View>
                    <Button title="Edit Profile" onPress={()=>navigation.navigate('EditProfile')}></Button>
                    <Button title="Add Experience" onPress={()=>navigation.navigate('AddExperience')}></Button>
                    <Button title="Add Education" onPress={()=>navigation.navigate('AddEducation')}></Button>
                    <Button title="Profiles" onPress={()=>navigation.navigate('Profiles')}></Button>
                    <Text>Social Links</Text>
                </View> */}

                {/* <View>
                    <Text>{profile && profile.social.facebook}</Text>
                    <Text>{profile && profile.social.youtube}</Text>
                    <Text>{profile && profile.social.linkedin}</Text>
                    <Text>{profile && profile.social.twitter}</Text>
                </View> */}