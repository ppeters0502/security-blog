import React from 'react';
import { Container, Card, Row, Col, Dropdown } from 'react-bootstrap';
import { frontMatterPost } from '../types/frontMatterPost';

interface propsType {
  posts: frontMatterPost[];
  category: string;
  categoryFilter: string;
  onPostSelection: (post: frontMatterPost) => void;
  onCategorySelection: (category: string) => void;
}

const Blog = (props: propsType) => {
  return (
    <>
      <Container>
        <h3>Posts</h3>
        <Dropdown>
          <Dropdown.Toggle variant='primary' id='dropdown-basic'>
            {props.categoryFilter}
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item
              onClick={() => {
                props.onCategorySelection('ctf_walkthroughs');
              }}
            >
              CTF WalkThroughs
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => {
                props.onCategorySelection('100_days');
              }}
            >
              100 Days of Code
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => {
                props.onCategorySelection('misc.');
              }}
            >
              Miscellaneous
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => {
                props.onCategorySelection('all');
              }}
            >
              All
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <Row xs={1} md={2} lg={3} className='g-4'>
          {props.posts.length > 0 &&
            props.posts.map((post, postIndex) => (
              <Col key={postIndex}>
                <Card
                  bg={'light'}
                  style={{ margin: '50px', cursor: 'pointer', width: '24rem' }}
                  onClick={(e) => {
                    props.onPostSelection(post);
                  }}
                >
                  <Card.Img variant='top' src={post.featureImage} />
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
