import React from 'react';
import { Container } from 'react-bootstrap';
import ReactMarkdown from 'react-markdown';

interface propsType {
  title: string;
  publishedDate: string;
  content: string;
}

const Post = (props: propsType) => {
  return (
    <Container>
      <h2>{props.title}</h2>
      <h4>{props.publishedDate}</h4>

      <ReactMarkdown>{props.content}</ReactMarkdown>
    </Container>
  );
};

export default Post;
