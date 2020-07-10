import React, {useEffect} from 'react'
import { View, Text, AsyncStorage, Image, ImageBackground } from 'react-native'
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
import profile from '../../reducers/profile'



class MainProfile extends React.Component{
    constructor(props){
        super(props)
    }

    getResults = () => {
        this.props.getCurrentProfile();
    }

    componentDidMount(){
        this.getResults();
    }

    render(){
        return(
            <> 
                    <View>
                        <ScrollView>
                        {
                            this.props.profile.profile && 
                            <Top profile={this.props.profile.profile} navigation={this.props.navigation}/>
                        }
                        {
                            this.props.profile.profile && 
                            <About profile={this.props.profile.profile}/>
                        }
                        <Card>
                            <CardItem style={{alignSelf:'center', marginBottom:1}}>
                            <Image style={{width:25, height:25, marginRight:5}} source={require('../../assets/Images/experience.png')}/>   
                            <Text style={{fontWeight:'bold', fontSize:15}}>Experience</Text>
                        </CardItem>
                        </Card>
            
                        { this.props.profile.profile &&  this.props.profile.profile.experience.length > 0
                          ? 
                          ( <>
                                {this.props.profile.profile.experience.slice(0,2).map(experience => (
                                    <Experience key={experience._id} experience={experience}/>
                                ))}
                        </>
                        ) : <Text>No Experience Credentials</Text>}
    
                        <Card>
                            <CardItem style={{alignSelf:'center', marginBottom:1}}>
                            <Image style={{width:25, height:25, marginRight:5}} source={require('../../assets/Images/education.png')}/>   
                            <Text style={{fontWeight:'bold', fontSize:15}}>Education</Text>
                        </CardItem>
                        </Card>
    
                        
                        { this.props.profile.profile &&  this.props.profile.profile.education.length > 0
                          ? 
                          ( <>
                                {this.props.profile.profile.education.slice(0,2).map(education => (
                                    <Education key={education._id} education={education}/>
                                ))}
                        </>
                        ) : <Text>No Education Credentials</Text>}
                        {/* <Button title="String" onPress={()=>this.props.getCurrentProfile()}/> */}
                        </ScrollView>
                        
                    </View>
                </>
    
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




export default connect(mapStateToProps, {getCurrentProfile})(MainProfile)




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