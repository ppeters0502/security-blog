import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import ReactMarkdown from 'react-markdown';

interface propsType {
  title: string | undefined;
  publishedDate: string | undefined;
  content: string | undefined;
}

const Post = (props: propsType) => {
  return (
    <Container style={{ marginBottom: '20vh' }}>
      <h2>{props.title}</h2>
      <h4>{props.publishedDate}</h4>
      {props.content && <ReactMarkdown components={{
        img: ({ node, ...props }) => <><Row style={{ marginTop: 25 }}><Col><img alt={props.alt} src={props.src} style={{ maxWidth: '50vw' }} /></Col></Row></>
      }}>{props.content}</ReactMarkdown>}
    </Container>
  );
};

export default Post;
