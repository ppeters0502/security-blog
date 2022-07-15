import React from 'react';
import { Container, Card, Row, Col } from 'react-bootstrap';
import { frontMatterPost } from '../types/frontMatterPost';
import Header from './Header';

interface propsType {
  posts: frontMatterPost[];
}

const Blog = (props: propsType) => {
  return (
    <>
      <Header />
      <Container>
        <Row xs={1} md={2} lg={3} className="g-4">
          {props.posts.length > 0 &&
            props.posts.map((post, postIndex) => (
              <Col>
                <Card bg={'light'} style={{ margin: '50px', cursor: 'pointer', width: '24rem' }} onClick={(e) => alert('You just clicked on post number: ' + post.id)} onMouseEnter={(e) => {}}>
                  <Card.Img variant="top" src={post.featuredImage} />
                  <Card.Body>
                    <Card.Title>{post.metaData['title']}</Card.Title>
                    <Card.Text>
                      {post.metaData['publishedDate']}
                      <br />
                      {post.metaData['description']}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
        </Row>
      </Container>
    </>
  );
};

export default Blog;
