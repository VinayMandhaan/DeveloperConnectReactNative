import React, {useEffect} from 'react';
import { View, Text, SafeAreaView, ImageBackground, TouchableOpacity, ScrollView, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator, DrawerItem } from '@react-navigation/drawer';
import SignUp from '../components/SignUp'
import Login from '../components/Login'
import Home from '../components/User/Home'
import EditProfile from '../components/EditProfile'
import AddExperience from '../components/AddExperience'
import AddEducation from '../components/AddEducation'
import Profiles from '../components/profiles/Profiles'
import ProfileItem from '../components/profiles/ProfileItem'
import Profile from '../components/profile/Profile'
import Posts from '../components/post/Posts'
import PostItem from '../components/post/PostItem';
import SinglePost from '../components/post/SinglePost'
import MainProfile from '../components/User/MainProfile'
import Logout from '../components/User/Logout'
import CreateProfile from '../components/CreateProfile'
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();


function CustomDrawerContent(props){
  return(
      
      <View>
          
          <ScrollView>
          <View>
          <ImageBackground source={require('../assets/Images/Code3.jpg')} style={{width:'100%', height:150, marginBottom:10}}>
          <View style={{display:'flex', textAlign:'center'}}>
              <View style={{marginTop:40}}>
                    <Text style={{display:'flex',textAlign:'center', color:'white', fontWeight:'bold', fontSize:30}}>Dev Connector.</Text>
                    <Text style={{display:'flex',textAlign:'center', color:'white', fontWeight:'bold',fontSize:10}}>Connect With Developers All Around The World.</Text>
              </View>
          </View>
          </ImageBackground>
          </View>
          <View style={{marginLeft:20}}>
          <TouchableOpacity style={{marginTop:20}} onPress={()=> props.navigation.navigate('Home')}>
          <View style={{flexDirection:'row'}}>
            <Image style={{height:15, width:15}} source={require('../assets/Images/home.png')}/>
            <Text style={{marginLeft:5}}>Home</Text>
          </View>
          </TouchableOpacity>
          <TouchableOpacity style={{marginTop:40}} onPress={()=> props.navigation.navigate('Profiles')}>
          <View style={{flexDirection:'row'}}>
            <Image style={{height:15, width:15}} source={require('../assets/Images/group.png')}/>
            <Text style={{marginLeft:5}}>Developers</Text>
          </View>
          </TouchableOpacity>
          <TouchableOpacity style={{marginTop:40}} onPress={()=> props.navigation.navigate('Posts')}>
          <View style={{flexDirection:'row'}}>
            <Image style={{height:15, width:15}} source={require('../assets/Images/comment.png')}/>
            <Text style={{marginLeft:5}}>Posts</Text>
          </View>
          </TouchableOpacity>
          <TouchableOpacity style={{marginTop:40}} onPress={()=> props.navigation.navigate('Logout')}>
          <View style={{flexDirection:'row'}}>
            <Image style={{height:15, width:15}} source={require('../assets/Images/logout.png')}/>
            <Text style={{marginLeft:5}}>Logout</Text>
          </View>
          </TouchableOpacity>
          </View>
          </ScrollView>
      </View>
  )
}

function Main(){
  return(
      <Drawer.Navigator drawerContent={props => CustomDrawerContent(props)}>
        <Drawer.Screen name="Home" component={Home}/>
        {/* <Drawer.Screen name="EditProfile" component={EditProfile}/>
        <Drawer.Screen name="AddEducation" component={AddEducation}/>
        <Drawer.Screen name="AddExperience" component={AddExperience}/> */}
        <Drawer.Screen name="Profiles" component={Profiles}/>
        <Drawer.Screen name="Posts" component={Posts}/>
        <Drawer.Screen name="Logout" component={Logout}/>
      </Drawer.Navigator>
  )
}


function Routes() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{
        headerShown: false
    }}>
      
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="SignUp" component={SignUp}/>
        <Stack.Screen name="Home" component={Main}/>
        <Stack.Screen name="EditProfile" component={EditProfile}/>
        <Stack.Screen name="AddExperience" component={AddExperience}/>
        <Stack.Screen name="AddEducation" component={AddEducation}/>
        <Stack.Screen name="Profiles" component={Profiles}/>
        <Stack.Screen name="ProfileItem" component={ProfileItem}/>
        <Stack.Screen name="Profile" component={Profile}/>
        <Stack.Screen name="Posts" component={Posts} />
        <Stack.Screen name="PostItem" component={PostItem} />
        <Stack.Screen name="SinglePost" component={SinglePost} />
        <Stack.Screen name="MainProfile" component={MainProfile}/>
        <Stack.Screen name="CreateProfile" component={CreateProfile}/>

      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Routes;