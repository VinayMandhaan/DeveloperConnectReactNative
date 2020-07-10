import React from 'react'
import {connect} from 'react-redux'
import { View, AsyncStorage, Image, ImageBackground, Button,ScrollView, TouchableOpacity } from 'react-native'
import { Container, Header, Content, Card, CardItem,DeckSwiper,Tab, Tabs, ScrollableTab, Icon, Right, Text, Left,SwipeRow } from 'native-base';
import LinearGradient from 'react-native-linear-gradient'
import {deleteEducation} from '../../actions/profile'
import moment from 'moment'


const Education = ({education: {
    _id,
    school,
    degree,
    fieldofstudy,
    from,
    to,
    descritpion
},deleteEducation,profile:{profile, loading},auth}) => {
    const fromDate = from
    const toDate = to
    const fromMomentDate = moment(fromDate).format('MMM Do YYYY')
    const toMomentDate = moment(toDate).format('MMM Do YYYY')
    return (
        <>
        <Card style={{marginBottom:10, paddingTop:10,borderWidth:0.5, borderRadius:10, marginRight:20, marginLeft:20}}>
        <CardItem>
            <Text note>School</Text>
            <Right>
                <Text style={{fontWeight:'bold',fontSize:14}}>{school}</Text>
            </Right>
        </CardItem>
        <CardItem>
            <Text note>Degree</Text>
            <Right style={{textAlign:'right'}}>
                <Text style={{fontWeight:'bold',fontSize:14}}>{degree}</Text>
            </Right>
        </CardItem>
        <CardItem>
            <Text note>Field Of Study</Text>
            <Right>
                <Text style={{fontWeight:'bold',fontSize:14}}>{fieldofstudy}</Text>
            </Right>
        </CardItem>
        <CardItem>
            <Text note>From</Text>
            <Right>
                <Text style={{fontSize:14}}>{fromMomentDate}</Text>
            </Right>
        </CardItem>
        { to &&
        <CardItem>
            <Text note>To</Text>
            <Right>
                <Text style={{fontSize:14}}>{toMomentDate}</Text>
            </Right>
        </CardItem>
        }
        <CardItem style={{marginLeft:100}}>
        {
            auth.isAuthenticated && auth.loading === false && auth.user._id === profile.user._id && (<Right>
            <TouchableOpacity onPress={() => deleteEducation(_id)}>
            <Image style={{width:20, height:20, marginRight:5}} source={require('../../assets/Images/delete.png')}/>
            </TouchableOpacity>
            </Right>)
        }
    </CardItem>
        
        {/* <CardItem>
            <Text>Descritpion</Text>
            <Right>
                <Text>{descritpion}</Text>
            </Right>
        </CardItem>s */}
        </Card>
        
        </>
    
    )
}

const mapStateToProps = state => ({
    profile : state.profile,
    auth: state.auth
})
export default connect(mapStateToProps,{deleteEducation})(Education)