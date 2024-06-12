import React, { useState } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import Header from '../components/Header';
import { SingleCommentProps } from '../types/SingleCommentProps';
import SingleComment from './SingleComment';

interface propsType {
  comments: SingleCommentProps[];
  setPostComments: (event: any) => void;
  onSubmitComment: (props: SingleCommentProps) => void;
  postID: number;
  commentAuthor: string;
  commentText: string;
  setCommentAuthor: (event: any) => void;
  setCommentText: (event: any) => void;
}

const CommentSection = (props: propsType) => {
  const handleName = (event: any) => {
    props.setCommentAuthor(event.target.value);
  };
  const handleComment = (event: any) => {
    props.setCommentText(event.target.value);
  };
  const handleSubmit = () => {
    let _newComment: SingleCommentProps = {
      postID: props.postID,
      text: props.commentText,
      author: props.commentAuthor,
      postDate: new Date().toLocaleString(),
    };
    props.onSubmitComment(_newComment);
    props.setPostComments([_newComment, ...props.comments]);
  };

  return (
    <Container>
      {props.comments.length > 0 &&
        props.comments.map((comment, commentIndex) => <SingleComment key={commentIndex} text={comment.text} postID={comment.postID} author={comment.author} postDate={comment.postDate} />)}
      <h3>Submit a Comment</h3>
      <Form>
        <Form.Group className='mb-3' controlId='exampleForm.ControlInput1'>
          <Form.Label>Name</Form.Label>
          <Form.Control type='text' placeholder='Chuck' required value={props.commentAuthor} onChange={handleName} />
        </Form.Group>
        <Form.Group className='mb-3' controlId='exampleForm.ControlTextarea1'>
          <Form.Label>Comment</Form.Label>
          <Form.Control as='textarea' rows={3} required value={props.commentText} onChange={handleComment} />
        </Form.Group>
        <Button onClick={handleSubmit}>Submit</Button>
      </Form>
    </Container>
  );
};

export default CommentSection;
