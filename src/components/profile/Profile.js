import React, {useEffect, Fragment} from 'react'
import {connect} from 'react-redux'
import {getProfileById} from '../../actions/profile'
import { View, Text, AsyncStorage, Image, ImageBackground, Button, ActivityIndicator } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import ProfileTop from './ProfileTop'
import ProfileAbout from './ProfileAbout'
import ProfileExperience from './ProfileExperience'
import ProfileEducation from './ProfileEducation'
import { Container, Header, Content, Card, CardItem, Icon, Right } from 'native-base';

const Profile = ({getProfileById,profile:{profile, loading},auth,route}) => {

    const {id} = route.params
    useEffect(()=>{console.warn(id._id)
        getProfileById(id._id)
    },[getProfileById])

    return (
        <View>
            <ScrollView>
            {
                profile && 
                <ProfileTop profile={profile}/>

            }
            {
                        profile && 
                        <ProfileAbout profile={profile}/>
                    }
                    <Card>
                        <CardItem style={{alignSelf:'center', marginBottom:1}}>
                        <Image style={{width:25, height:25, marginRight:5}} source={require('../../assets/Images/experience.png')}/>   
                        <Text style={{fontWeight:'bold', fontSize:15}}>Experience</Text>
                    </CardItem>
                    </Card>
        
                    { profile &&  profile.experience.length > 0
                      ? 
                      ( <>
                            {profile.experience.slice(0,2).map(experience => (
                                <ProfileExperience key={experience._id} experience={experience}/>
                            ))}
                    </>
                    ) : <Text>No Experience Credentials</Text>}

                    <Card>
                        <CardItem style={{alignSelf:'center', marginBottom:1}}>
                        <Image style={{width:25, height:25, marginRight:5}} source={require('../../assets/Images/education.png')}/>   
                        <Text style={{fontWeight:'bold', fontSize:15}}>Education</Text>
                    </CardItem>
                    </Card>

                    
                    { profile &&  profile.education.length > 0
                      ? 
                      ( <>
                            {profile.education.slice(0,2).map(education => (
                                <ProfileEducation key={education._id} education={education}/>
                            ))}
                    </>
                    ) : <Text>No Education Credentials</Text>}
            </ScrollView>
        </View>
    )
}


const mapStateToProps = state => ({
    profile : state.profile,
    auth: state.auth
})

export default connect(mapStateToProps, {getProfileById})(Profile)
