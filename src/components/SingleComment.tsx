import React from 'react';
import { Card } from 'react-bootstrap';
import Header from '../components/Header';
import { SingleCommentProps } from '../types/SingleCommentProps';

const SingleComment = (commentProps: SingleCommentProps) => {
  return (
    <Card style={{ width: '35rem' }}>
      <Card.Body>
        <Card.Title>{commentProps.author}</Card.Title>
        <Card.Subtitle className='mb-2 text-muted'>{commentProps.postDate}</Card.Subtitle>
        <Card.Text>{commentProps.text}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default SingleComment;
