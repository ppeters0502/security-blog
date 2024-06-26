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
  comments: SingleCommentProps[];
  setPostComments: (event: any) => void;
  onCommentSubmission: (comment: SingleCommentProps) => void;
  commentAuthor: string;
  commentText: string;
  setCommentAuthor: (event: any) => void;
  setCommentText: (event: any) => void;
  postID: number;
}

const Post = (props: propsType) => {
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
      {props.comments.length > 0 && <h2>Comments</h2>}
      <CommentSection
        comments={props.comments}
        setPostComments={props.setPostComments}
        onSubmitComment={props.onCommentSubmission}
        postID={props.postID}
        commentAuthor={props.commentAuthor}
        commentText={props.commentText}
        setCommentAuthor={props.setCommentAuthor}
        setCommentText={props.setCommentText}
      />
    </Container>
  );
};

export default Post;
