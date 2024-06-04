import React, { useState } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import Header from '../components/Header';
import { SingleCommentProps } from '../types/SingleCommentProps';
import SingleComment from './SingleComment';

interface propsType {
  comments: SingleCommentProps[];
  onSubmitComment: (props: SingleCommentProps) => void;
  postID: number;
}

const CommentSection = (props: propsType) => {
  const [name, setName] = React.useState<string>('');
  const [comment, setComment] = React.useState<string>('');
  const [commentList, setCommentList] = React.useState<SingleCommentProps[]>(props.comments);

  const handleName = (event: any) => {
    setName(event.target.value);
  };
  const handleComment = (event: any) => {
    setComment(event.target.value);
  };
  const handleSubmit = () => {
    let _newComment: SingleCommentProps = {
      postID: props.postID,
      text: comment,
      author: name,
      postDate: new Date().toLocaleString(),
    };
    props.onSubmitComment(_newComment);
    setComment('');
    setName('');
    setCommentList([...commentList, _newComment]);
  };

  return (
    <Container>
      {commentList.length > 0 && commentList.map((comment) => <SingleComment text={comment.text} postID={comment.postID} author={comment.author} postDate={comment.postDate} />)}
      <h3>Submit a Comment</h3>
      <Form>
        <Form.Group className='mb-3' controlId='exampleForm.ControlInput1'>
          <Form.Label>Name</Form.Label>
          <Form.Control type='text' placeholder='Chuck' required value={name} onChange={handleName} />
        </Form.Group>
        <Form.Group className='mb-3' controlId='exampleForm.ControlTextarea1'>
          <Form.Label>Comment</Form.Label>
          <Form.Control as='textarea' rows={3} required value={comment} onChange={handleComment} />
        </Form.Group>
        <Button onClick={handleSubmit}>Submit</Button>
      </Form>
    </Container>
  );
};

export default CommentSection;
