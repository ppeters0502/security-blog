import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import CommentSection from './CommentSection';
import { SingleCommentProps } from '../types/SingleCommentProps';

interface propsType {
  title: string | undefined;
  publishedDate: string | undefined;
  content: string | undefined;
}

const Post = (props: propsType) => {
  const comments: SingleCommentProps[] = [
    {
      text: 'This is words.',
      postID: 4,
      author: 'Chuck Mangione',
      postDate: '6/2/2024',
    },
    {
      text: 'This is more words. This is more words. This is more words. This is more words. This is more words. This is more words. This is more words. This is more words. This is more words.',
      postID: 4,
      author: 'AJ HamHands',
      postDate: '5/20/2024',
    },
  ];
  return (
    <Container style={{ marginBottom: '20vh' }}>
      <h2>{props.title}</h2>
      <h4>{props.publishedDate}</h4>
      {props.content && (
        <ReactMarkdown
          components={{
            img: ({ node, ...props }) => (
              <>
                <Row style={{ marginTop: 25, marginBottom: 25 }}>
                  <Col>
                    <img alt={props.alt} src={props.src} style={{ maxWidth: '50vw' }} />
                  </Col>
                </Row>
              </>
            ),
          }}
          remarkPlugins={[remarkGfm]}
        >
          {props.content}
        </ReactMarkdown>
      )}
      <CommentSection comments={comments} />
    </Container>
  );
};

export default Post;
