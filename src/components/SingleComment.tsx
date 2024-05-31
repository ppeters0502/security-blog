import React from 'react';
import { Card } from 'react-bootstrap';
import Header from '../components/Header';
import { SingleCommentProps } from '../types/SingleCommentProps';

const SingleComment = (commentProps: SingleCommentProps) => {
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Title>Card Title</Card.Title>
        <Card.Subtitle className='mb-2 text-muted'>Card Subtitle</Card.Subtitle>
        <Card.Text>{commentProps.text}</Card.Text>
        <Card.Link href='#'>Card Link</Card.Link>
        <Card.Link href='#'>Another Link</Card.Link>
      </Card.Body>
    </Card>
  );
};

export default SingleComment;
