import React, { useState } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import Header from '../components/Header';
import { SingleCommentProps } from '../types/SingleCommentProps';
import SingleComment from './SingleComment';

interface propsType {
  comments: SingleCommentProps[];
  onSubmitComment: (props: SingleCommentProps) => void;
}

const CommentSection = (props: propsType) => {
  const handleSubmit = () => {};
  const [name, setName] = React.useState<string>('');
  const [comment, setComment] = React.useState<string>('');
  return (
    <Container>
      {props.comments.length > 0 && props.comments.map((comment) => <SingleComment text={comment.text} postID={comment.postID} author={comment.author} postDate={comment.postDate} />)}
      <h3>Submit a Comment</h3>
      <Form>
        <Form.Group className='mb-3' controlId='exampleForm.ControlInput1'>
          <Form.Label>Name</Form.Label>
          <Form.Control type='text' placeholder='Chuck' required />
        </Form.Group>
        <Form.Group className='mb-3' controlId='exampleForm.ControlTextarea1'>
          <Form.Label>Comment</Form.Label>
          <Form.Control as='textarea' rows={3} required />
        </Form.Group>
        <Button type='submit' onClick={handleSubmit}>
          Submit
        </Button>
      </Form>
    </Container>
  );
};

export default CommentSection;
