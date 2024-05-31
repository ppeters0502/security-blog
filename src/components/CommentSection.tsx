import React from 'react';
import { Container } from 'react-bootstrap';
import Header from '../components/Header';
import { SingleCommentProps } from '../types/SingleCommentProps';
import SingleComment from './SingleComment';

interface propsType {
  comments: SingleCommentProps[];
}

const CommentSection = (props: propsType) => {
  return <Container>{props.comments.length > 0 && props.comments.map((comment) => <SingleComment text={comment.text} postID={comment.postID} />)}</Container>;
};

export default CommentSection;
