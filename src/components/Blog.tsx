import React from 'react';
import { Container } from 'react-bootstrap';
import ReactMarkdown from 'react-markdown';
import { frontMatterPost } from '../types/frontMatterPost';
import Header from './Header';

interface propsType {
  posts: frontMatterPost[]
};


const Blog = (props: propsType) => {

  return (
    <>
      <Header />
      <Container>
        {props.posts.length > 0 && props.posts.map((post, postIndex) => (
          <div className="post_container">
            <div className="post_title" key={postIndex}>
              <h3>{post.metaData['title']}</h3>
            </div>
            <div className="post_content">
              <ReactMarkdown >{post.content}</ReactMarkdown>
            </div>
          </div>

        ))}
      </Container>
    </>
  );
};

export default Blog;
