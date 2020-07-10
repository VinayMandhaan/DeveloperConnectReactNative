import React, {Component} from 'react';
import {View, Image} from 'react-native';
import {connect} from 'react-redux';
import {TouchableOpacity, ScrollView} from 'react-native-gesture-handler';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right } from 'native-base';
import {addLike, unLike, deletePost} from '../../actions/post';
import SinglePost from './SinglePost';
import moment from 'moment'

class PostItem extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const {
      deletePost,
      addLike,
      unLike,
      auth,
      post: {_id, text, name, avatar, user, likes, comments, date},
      showActions,
      navigate,
    } = this.props;
    const postDate = date
    const postMomentDate = moment(postDate).calendar();    
    return (
        <>
        <Card style={{marginBottom:10, paddingTop:10,borderWidth:0.5, borderRadius:10, marginRight:20, marginLeft:20}}>
            <CardItem style={{}}>
              <Left>
                <Thumbnail source={{uri: 'http:' + avatar}} />
                <Body>
                <Text style={{fontSize:10, textAlign:'right'}}>{postMomentDate}</Text>
                <Text style={{fontSize:15}}>{name}</Text>
                <Text note style={{fontWeight:'bold', letterSpacing:1}}>{text}</Text>
                </Body>
              </Left>
            </CardItem>
            {showActions && (
            <CardItem>
              <Left>
              {likes.length > 0 && (
                    <Text note>({likes.length})</Text>
              )}
              <TouchableOpacity onPress={() => addLike(_id)}>
                <Image style={{width:15, height:15, marginRight:5}} source={require('../../assets/Images/like.png')}/>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => unLike(_id)}>
                <Image style={{width:12, height:12, marginRight:5}} source={require('../../assets/Images/unlike.png')}/>
              </TouchableOpacity>
              </Left>
              <Body>
              <TouchableOpacity onPress={() => this.props.navigation.navigate('SinglePost', {id: _id})}>
                  <View style={{flexDirection:'row'}}>
                  {/* <Image style={{width:12, height:12}} source={require('../../assets/Images/comments.png')}/> */}
                  <Text note style={{marginTop:10}}>Discussions</Text>
                  {comments.length > 0 && (
                    <Text note style={{marginTop:10}}>({comments.length})</Text>
                  )}
                  </View>
                </TouchableOpacity>
              </Body>
              
              {!auth.loading && user === auth.user._id && (
              <Right>
                  <TouchableOpacity onPress={() => deletePost(_id)}>
                  < Image style={{width:15, height:15, marginRight:5}} source={require('../../assets/Images/delete.png')}/>
                  </TouchableOpacity>
              </Right>
              )}
            </CardItem>
            )}
          </Card>
        </>
      // <View>
      //   <View style={{flexDirection: 'row', margin: 5}}>
      //     <View style={{marginRight: 8}}>
      //       <Image
      //         source={{
      //           uri: 'http:' + avatar,
      //         }}
      //         style={{width: 50, height: 50}}
      //       />
      //       <Text>{name}</Text>
      //     </View>
      //     <View style={{marginTop: 2}}>
      //       <Text>{text}</Text>
      //       <Text>Published on {date}</Text>
      //       {showActions && (
      //         <View style={{flexDirection: 'row'}}>
      //           <TouchableOpacity onPress={() => addLike(_id)}>
      //           <Text>Like me nowww</Text>
      //           </TouchableOpacity>
      //           <TouchableOpacity
      //             onPress={() => unLike(_id)}
      //             style={{backgroundColor: 'dimgrey', marginRight: 10}}>
      //             <Text style={{color: 'white'}}>Unlikes</Text>
      //           </TouchableOpacity>
      //           <TouchableOpacity
      //             onPress={() =>
      //               this.props.navigation.navigate('SinglePost', {id: _id})
      //             }
      //             style={{
      //               backgroundColor: 'cadetblue',
      //               marginRight: 10,
      //               flexDirection: 'row',
      //             }}>
      //             <Text style={{color: 'white'}}>Comments</Text>
      //             {comments.length > 0 && (
      //               <Text style={{color: 'white'}}>({comments.length})</Text>
      //             )}
      //           </TouchableOpacity>
      //           {!auth.loading && user === auth.user._id && (
      //             <TouchableOpacity
      //               onPress={() => deletePost(_id)}
      //               style={{backgroundColor: 'firebrick', marginRight: 10}}>
      //               <Text style={{color: 'white'}}>Delete</Text>
      //             </TouchableOpacity>
      //           )}
      //         </View>
      //       )}
      //     </View>
      //   </View>
      // </View>
    );
  }
}
PostItem.defaultProps = {
  showActions: true,
};
const mapStateToProps = state => ({
  auth: state.auth,
});
export default connect(
  mapStateToProps,
  {addLike, unLike, deletePost},
)(PostItem);
