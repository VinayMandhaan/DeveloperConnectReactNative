import React, {useEffect,useState} from 'react'
import { View, Text, AsyncStorage, Image, ImageBackground, TextInput, CheckBox, ActivityIndicator } from 'react-native'
import {connect} from 'react-redux'
import {getProfiles} from '../../actions/profile'
import ProfileItem from './ProfileItem'
import {ScrollView} from 'react-native-gesture-handler'

import { Container, Header, Content, Card, CardItem, Icon, Right, Button, DatePicker } from 'native-base';



const Profiles = ({getProfiles, profile:{profiles, loading}, navigation}) => {
    useEffect(()=>{
        getProfiles()
    },[getProfiles])
    return (
        <View>
      <ScrollView>
      <ImageBackground source={require('../../assets/Images/Code3.jpg')} style={{width:'100%', height:150, marginBottom:10}}>
        <View style={{display:'flex', textAlign:'center'}}>
          <View style={{marginTop:20, marginBottom:60}}>
              {/* <Text style={{display:'flex',textAlign:'center', color:'white', fontWeight:'bold', fontSize:40}}>Dev Connector.</Text>
              <Text style={{display:'flex',textAlign:'center', color:'white', fontWeight:'bold',fontSize:10}}>Connect With Developers All Around The World.</Text> */}
              <Text style={{display:'flex',textAlign:'center', color:'white', fontWeight:'bold',fontSize:25, marginTop:30}}>Developers.</Text>
              <View style={{ borderBottomColor:'white',borderBottomWidth: 2, width:150, alignSelf:'center', marginTop:10}}></View>
          </View>
        </View>
      </ImageBackground>
        <>
            {profiles.length > 0 ? (
                        profiles.map(profile => (
                            <ProfileItem key={profile._id} profile={profile} navigation={navigation}/>
                        ))
                    ) : <Text>No Profiles Found</Text>}
        </>
        </ScrollView>
        </View>
            
    )
}

const mapStateToProps = state => ({
    profile : state.profile
})

export default connect(mapStateToProps, {getProfiles})(Profiles)









// class Profiles extends React.Component{
//     constructor(props){
//         super(props)
        
//     }

//     componentDidMount(){
//         this.props.getProfiles()
//     }
//     render(){ 
//         return(
//             <View>
//                 {
//                     this.props.profile.profiles.length > 0 ? (
//                         this.props.profile.profiles.map(profile => (
//                             <ProfileItem key={profile._id} profile={profile}/>
//                         ))
//                     ) : <Text>No Profilesssssss</Text>
//                 }
//             </View>
//         )
//     }
// }

// const mapStateToProps = state => ({
//     profile : state.profile
// })


// export default connect(mapStateToProps, {getProfiles})(Profiles)

