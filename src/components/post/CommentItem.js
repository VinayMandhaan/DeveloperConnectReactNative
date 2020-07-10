import React, {Component} from 'react';
import {View, Image, TouchableOpacity} from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right } from 'native-base';
import {connect} from 'react-redux';
import {deleteComment} from '../../actions/post';
import moment from 'moment'

class CommentItem extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const {
      postId,
      comment: {_id, text, name, avatar, user, date},
      auth,
      deleteComment,
    } = this.props;
    const commentDate = date
    const commentMomentDate = moment(commentDate).calendar();    
 

    return (
      <>
      <Card transparent style={{marginBottom:10, paddingTop:10,borderWidth:0.5, borderRadius:10, marginRight:20, marginLeft:20}}>
          <CardItem style={{}}>
              <Left>
                <Thumbnail source={{uri: 'http:' + avatar}} style={{width:30,height:30}} />
                <Body>
                <Text style={{fontSize:15}}>{name}</Text>
                <Text note style={{fontWeight:'bold', letterSpacing:1}}>{text}</Text>
                </Body>
              </Left>
            </CardItem>
            <CardItem>
              <Left>
                  <Text note>{commentMomentDate}</Text>
              </Left>
            {!auth.loading && user === auth.user._id && (
              <Right>
                  <TouchableOpacity onPress={() => deleteComment(postId, _id)}>
                  < Image style={{width:15, height:15, marginRight:5}} source={require('../../assets/Images/delete.png')}/>
                  </TouchableOpacity>
              </Right>
              )}
            </CardItem>
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
      //       {!auth.loading && user === auth.user._id && (
      //         <TouchableOpacity
      //           onPress={() => deleteComment(postId, _id)}
      //           style={{backgroundColor: 'firebrick', marginRight: 10}}>
      //           <Text style={{color: 'white'}}>Delete</Text>
      //         </TouchableOpacity>
      //       )}
      //     </View>
      //   </View>
      // </View>
    );
  }
}
const mapStateToProps = state => ({
  auth: state.auth,
});
export default connect(
  mapStateToProps,
  {deleteComment},
)(CommentItem);
