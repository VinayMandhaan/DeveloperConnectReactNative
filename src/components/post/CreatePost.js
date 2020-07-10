import React, {Component} from 'react';
import {connect} from 'react-redux';
import {addPost} from '../../actions/post';
import {getPosts} from '../../actions/post';
import {View, TextInput, Text} from 'react-native';
import { Container, Header, Content, Card, CardItem, Icon, Right, Button, DatePicker, Input, Item } from 'native-base';

class CreatePost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
    };
  }
  onSubmit = () => {
    const {text} = this.state;
    const newPost = {text};
    this.props.addPost({text});
    this.props.getPosts()
  };
  render() {
    const {addPost} = this.props;
    return (
      <View>
        <Item rounded style={{marginBottom:20, marginTop:20,alignSelf:'center'}}>
        <Input
          style={{textAlign:'center',fontSize:15, color:'black', fontWeight:'bold'}}
          placeholder="Create A Post"
          value={this.state.text}
          onChangeText={text => this.setState({text})}
          placeholderTextColor={'black'}
        />
        </Item>

        <View style={{alignItems:'center', marginBottom:10, marginTop:10}}>
          <Button onPress={()=>this.onSubmit()} style={{width:'80%',justifyContent:'center', borderColor:'red'}} dark rounded><Text style={{display:'flex',textAlign:'center', color:'white', fontWeight:'bold',fontSize:15}}>Add</Text></Button>
        </View>
      </View>
    );
  }
}

export default connect(
  null,
  {addPost,getPosts},
)(CreatePost);
