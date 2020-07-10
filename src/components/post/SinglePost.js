import React, {Component, useEffect} from 'react';
import {connect} from 'react-redux';
import {getPost} from '../../actions/post';
import {View} from 'react-native';
import PostItem from './PostItem';
import CommentForm from './CommentForm';
import CommentItem from './CommentItem';
import { ScrollView } from 'react-native-gesture-handler';

const SinglePost = ({getPost, post: {post, loading}, route}) => {
  useEffect(() => {
    getPost(route.params.id);
  }, [getPost]);
  return loading || post === null ? null : (
    <View>
      <ScrollView>
      <PostItem post={post} showActions={false} />
      <CommentForm postId={post._id} />
      {post.comments.map((comment, key) => (
        <CommentItem key={key} comment={comment} postId={post._id} />
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
  {getPost},
)(SinglePost);
