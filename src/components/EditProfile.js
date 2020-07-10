import React, {useEffect} from 'react'
import { View, AsyncStorage, Image, ImageBackground } from 'react-native'
import {connect} from 'react-redux'
import {getCurrentProfile,createProfile} from '../actions/profile'
import {Button, Item, Input, Icon, Label,Footer, Text} from 'native-base'
import { ScrollView } from 'react-native-gesture-handler'


class EditProfile extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            company: '',
            website: '',
            location: '',
            status: '',
            skills: [],
            addedSkills:[],
            githubusername: '',
            bio: '',
            twitter: '',
            facebook: '',
            linkedin: '',
            youtube: '',
            instagram: ''
        }
    }
    componentDidMount(){
        this.props.getCurrentProfile()
        this.getProfileData()
        this.props.profile.profile.skills.map(s=>{
            this.setState({
                skills : s
            })
        })
    }

    getProfileData = () => {
        this.setState({
            company : !this.props.profile.profile.company ? '' : this.props.profile.profile.company,
            website : !this.props.profile.profile.website ? '' : this.props.profile.profile.website,
            location: !this.props.profile.profile.location ? '' : this.props.profile.profile.location,
            status: !this.props.profile.profile.status ? '' : this.props.profile.profile.status,
            githubusername: !this.props.profile.profile.githubusername ? '' : this.props.profile.profile.githubusername,
            bio: !this.props.profile.profile.bio ? '' : this.props.profile.profile.bio,
            twitter: !this.props.profile.profile.social ? '' : this.props.profile.profile.social.twitter,
            facebook: !this.props.profile.profile.social ? '' : this.props.profile.profile.social.facebook,
            linkedin: !this.props.profile.profile.social ? '' : this.props.profile.profile.social.linkedin,
            youtube: !this.props.profile.profile.social ? '' : this.props.profile.profile.social.youtube,
            instagram: !this.props.profile.profile.social ? '' : this.props.profile.profile.social.instagram,  
        })
    }


    onSubmit = () => {
        const {
            company,
            website,
            location,
            status,
            skills,
            githubusername,
            bio,
            twitter,
            facebook,
            linkedin,
            youtube,
            instagram
        } = this.state
        const formData = {
            company,
            website,
            location,
            status,
            skills,
            githubusername,
            bio,
            twitter,
            facebook,
            linkedin,
            youtube,
            instagram
        }

        this.props.createProfile(formData,true)
    }
    render(){ 
        return(
            <View>
                <ScrollView>
                <ImageBackground source={require('../assets/Images/Code3.jpg')} style={{width:'100%', height:200, marginBottom:10}}>
                <View style={{display:'flex', textAlign:'center'}}>
                <View style={{marginTop:20, marginBottom:60}}>
                    <Text style={{display:'flex',textAlign:'center', color:'white', fontWeight:'bold', fontSize:40}}>Dev Connector.</Text>
                    <Text style={{display:'flex',textAlign:'center', color:'white', fontWeight:'bold',fontSize:10}}>Connect With Developers All Around The World.</Text>
                    <Text style={{display:'flex',textAlign:'center', color:'white', fontWeight:'bold',fontSize:25, marginTop:30}}>Edit Profile</Text>
                    <View style={{ borderBottomColor:'white',borderBottomWidth: 2, width:120, alignSelf:'center', marginTop:10}}></View>
                </View>
            </View>
            </ImageBackground>
                <Text style={{textAlign:'center', marginBottom:30, fontWeight:'bold'}}>Company</Text>
                <Item rounded style={{marginBottom:20, width:'80%',alignSelf:'center'}}>
                    <Input style={{textAlign:'center',fontSize:12, color:'black', fontWeight:'bold'}}
                     placeholder="Company" value={this.state.company}
                     onChangeText={(company) => this.setState({ company })}
                     placeholderTextColor={'black'}
                     />
                </Item>
                <Text style={{textAlign:'center', marginBottom:30, fontWeight:'bold'}}>Website</Text>
                <Item rounded style={{marginBottom:20, width:'80%',alignSelf:'center'}}>
                <Input style={{textAlign:'center',fontSize:12, color:'black', fontWeight:'bold'}}
                placeholder="Website" value={this.state.website} 
                onChangeText={(website) => this.setState({ website })}
                placeholderTextColor={'black'}
                />
                </Item>
                <Text style={{textAlign:'center', marginBottom:30, fontWeight:'bold'}}>Location</Text>
                <Item rounded style={{marginBottom:20, width:'80%',alignSelf:'center'}}>
                <Input style={{textAlign:'center',fontSize:12, color:'black', fontWeight:'bold'}}
                placeholder="Location" value={this.state.location} 
                onChangeText={(location) => this.setState({ location })}
                placeholderTextColor={'black'}
                />
                </Item>
                <Text style={{textAlign:'center', marginBottom:30, fontWeight:'bold'}}>Status</Text>
                <Item rounded style={{marginBottom:20, width:'80%',alignSelf:'center'}}>
                    <Input style={{textAlign:'center',fontSize:12, color:'black', fontWeight:'bold'}}
                    placeholder="Status" value={this.state.status} 
                    onChangeText={(status) => this.setState({ status })}
                    placeholderTextColor={'black'}
                    />
                </Item>
                <Text note style={{textAlign:'center', fontSize:9}}>Please use comma separated values (eg.
            HTML,CSS,JavaScript,PHP)</Text>
                <Text style={{textAlign:'center', marginBottom:30, fontWeight:'bold'}}>Skills</Text>
                <Item rounded style={{marginBottom:20, width:'80%',alignSelf:'center'}}>
                    <Input style={{textAlign:'center',fontSize:12, color:'black', fontWeight:'bold'}}
                    placeholder="Skills" value={this.state.skills} 
                    onChangeText={(skills) => this.setState({ skills })}
                    placeholderTextColor={'black'}
                    />
                </Item>
                <Text style={{textAlign:'center', marginBottom:30, fontWeight:'bold'}}>Github User</Text>
                <Item rounded style={{marginBottom:20, width:'80%',alignSelf:'center'}}>
                    <Input style={{textAlign:'center',fontSize:12, color:'black', fontWeight:'bold'}}
                    placeholder="Githubusername" value={this.state.githubusername} 
                    onChangeText={(githubusername) => this.setState({ githubusername })}
                    placeholderTextColor={'black'}
                    />
                </Item>
                <Text style={{textAlign:'center', marginBottom:30, fontWeight:'bold'}}>Bio</Text>
                <Item rounded style={{marginBottom:20, width:'80%',alignSelf:'center'}}>
                    <Input style={{textAlign:'center',fontSize:12, color:'black', fontWeight:'bold'}}
                    placeholder="Bio" value={this.state.bio} 
                    onChangeText={(bio) => this.setState({ bio })}
                    placeholderTextColor={'black'}
                    />
                </Item>
                <Text style={{textAlign:'center', marginBottom:30, fontWeight:'bold'}}>Socials-Twitter</Text>
                <Item rounded style={{marginBottom:20, width:'80%',alignSelf:'center'}}>
                    <Input style={{textAlign:'center',fontSize:12, color:'black', fontWeight:'bold'}}
                    placeholder="Twitter" value={this.state.twitter} 
                    onChangeText={(twitter) => this.setState({ twitter })}/>
                </Item>
                <Text style={{textAlign:'center', marginBottom:30, fontWeight:'bold'}}>Socials-Facebook</Text>
                <Item rounded style={{marginBottom:20, width:'80%',alignSelf:'center'}}>
                    <Input style={{textAlign:'center',fontSize:12, color:'black', fontWeight:'bold'}}
                    placeholder="Facebook" value={this.state.facebook} 
                    onChangeText={(facebook) => this.setState({ facebook })}/>
                </Item>
                <Text style={{textAlign:'center', marginBottom:30, fontWeight:'bold'}}>Socials-Linkedin</Text>
                <Item rounded style={{marginBottom:20, width:'80%',alignSelf:'center'}}>
                    <Input style={{textAlign:'center',fontSize:12, color:'black', fontWeight:'bold'}}
                    placeholder="Linkedin" value={this.state.linkedin} 
                    onChangeText={(linkedin) => this.setState({ linkedin })}/>
                </Item>
                <Text style={{textAlign:'center', marginBottom:30, fontWeight:'bold'}}>Socials-Youtube</Text>
                <Item rounded style={{marginBottom:20, width:'80%',alignSelf:'center'}}>
                    <Input style={{textAlign:'center',fontSize:12, color:'black', fontWeight:'bold'}}
                    placeholder="Youtube" value={this.state.youtube} 
                    onChangeText={(youtube) => this.setState({ youtube })}/>
                </Item>
                <Text style={{textAlign:'center', marginBottom:30, fontWeight:'bold'}}>Socials-Instagram</Text>
                <Item rounded style={{marginBottom:20, width:'80%',alignSelf:'center'}}>
                    <Input style={{textAlign:'center',fontSize:12, color:'black', fontWeight:'bold'}}
                    placeholder="Instagram" value={this.state.instagram} 
                    onChangeText={(instagram) => this.setState({ instagram })}/>
                </Item>         
                <View style={{alignItems:'center', marginBottom:10}}>
                    <Button onPress={()=>this.onSubmit()} style={{width:'80%',justifyContent:'center', borderColor:'red'}} dark rounded><Text style={{display:'flex',textAlign:'center', color:'white', fontWeight:'bold',fontSize:20}}>Edit</Text></Button>
                </View>
                </ScrollView>
            </View>
        )
    }
}

const mapStateToProps = state => ({
    profile : state.profile

})

export default connect(mapStateToProps, {getCurrentProfile,createProfile})(EditProfile)


// const EditProfile  = ({profile: {profile,loading}, createProfile, getCurrentProfile}) => {
//     useEffect(()=>{
//         getCurrentProfile()
//     },[getCurrentProfile])

        

//         return(
//             <View>
//                 <Text>Hello World</Text>
//             </View>
//         )
//     }

// const mapStateToProps = state => ({
//     profile : state.profile

// })




// export default connect(mapStateToProps, {getCurrentProfile})(EditProfile)