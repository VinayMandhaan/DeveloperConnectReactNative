import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {View, TextInput, Text} from 'react-native';
import {addComment} from '../../actions/post';
import {add} from 'react-native-reanimated';
import { Container, Header, Content, Card, CardItem, Icon, Right, Button, DatePicker, Input, Item } from 'native-base';

class CommentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
    };
  }
  // onSubmit = async () => {
  //   const {text} = this.state;
  //   const newComment = {
  //     postId,
  //     text,
  //   };
  //   console.log('ppp', postId);

  //   addComment(postId, {text});
  // };
  render() {
    const {postId, addComment} = this.props;
    const {text} = this.state;
    return (
      <View>
        <Item rounded style={{marginBottom:20, marginTop:20,alignSelf:'center'}}>
        <Input
          style={{textAlign:'center',fontSize:15, color:'black', fontWeight:'bold'}}
          placeholder="Leave A Comment"
          value={this.state.text}
          onChangeText={text => this.setState({text})}
          placeholderTextColor={'black'}
        />
        </Item>

        <View style={{alignItems:'center', marginBottom:10, marginTop:10}}>
          <Button
            onPress={() => {
              addComment(postId, {text});
            }} style={{width:'80%',justifyContent:'center', borderColor:'red'}} dark rounded><Text style={{display:'flex',textAlign:'center', color:'white', fontWeight:'bold',fontSize:15}}>Add</Text>
          </Button>
        </View>
      </View>
    );
  }
}

export default connect(
  null,
  {addComment},
)(CommentForm);
