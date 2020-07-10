import React, {Fragment, useEffect} from 'react';
import {View, Text, ImageBackground} from 'react-native';
import {connect} from 'react-redux';
import {getPosts} from '../../actions/post';
import PostItem from './PostItem';
import CreatePost from './CreatePost';
import { ScrollView } from 'react-native-gesture-handler';

const Posts = ({getPosts, post: {posts, loading}, navigation}) => {
  useEffect(() => {
    getPosts();
  }, [getPosts]);
  return loading ? null : (
    <View>
      <ScrollView>
      <ImageBackground source={require('../../assets/Images/Code3.jpg')} style={{width:'100%', height:150, marginBottom:10}}>
        <View style={{display:'flex', textAlign:'center'}}>
          <View style={{marginTop:20, marginBottom:60}}>
              {/* <Text style={{display:'flex',textAlign:'center', color:'white', fontWeight:'bold', fontSize:40}}>Dev Connector.</Text>
              <Text style={{display:'flex',textAlign:'center', color:'white', fontWeight:'bold',fontSize:10}}>Connect With Developers All Around The World.</Text> */}
              <Text style={{display:'flex',textAlign:'center', color:'white', fontWeight:'bold',fontSize:25, marginTop:30}}>Add and View Posts.</Text>
              <View style={{ borderBottomColor:'white',borderBottomWidth: 2, width:250, alignSelf:'center', marginTop:10}}></View>
          </View>
        </View>
      </ImageBackground>
      <CreatePost />
      {posts.map((post, key) => (
        <PostItem key={key} post={post} navigation={navigation} />
      ))}
      </ScrollView>
    </View>
  );
};
const mapStateToProps = state => ({
  post: state.post,
});
export default connect(
  mapStateToProps,
  {getPosts},
)(Posts);
