import React from 'react';
import { Container } from 'react-bootstrap';
import { frontMatterPost } from '../types/frontMatterPost';
import Header from './Header';
import { LocalDataService } from './services/LocalDataService';

const Blog = () => {
  const _posts: frontMatterPost[] = LocalDataService.getAllPostsWithFrontMatter();

  return (
    <>
      <Header />
      <Container>
        <ul>
          {_posts.map((post, postIndex) => (
            <li>{post.metaData['title']}</li>
          ))}
        </ul>
      </Container>
    </>
  );
};

export default Blog;
