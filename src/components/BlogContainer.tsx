import React, { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { frontMatterPost } from '../types/frontMatterPost';
import Blog from './Blog';
import Header from './Header';
import Post from './Post';
import { LocalDataService } from './services/LocalDataService';

const BlogContainer = () => {
  const [posts, setPosts] = React.useState<frontMatterPost[]>(new Array<frontMatterPost>());
  const [singlePost, setSinglePost] = React.useState<boolean>(false);
  const [title, setTitle] = React.useState<string>('');
  const [publishedDate, setPublishedDate] = React.useState<string>('');
  const [content, setContent] = React.useState<string>('');

  useEffect(() => {
    Promise.all([LocalDataService.getAllPostsWithFrontMatter()]).then((response) => {
      setPosts(response[0]);
    });
  }, []);

  const onPostSelection = (post: frontMatterPost) => {
    setTitle(post.metaData['title']);
    setPublishedDate(post.metaData['publishedDate']);
    setContent(post.content);
    setSinglePost(true);
  };

  //     title: string;
  //   publishedDate: string;
  //   content: string;

  return (
    <>
      <Header />
      <Container>
        {singlePost && <Post title={title} publishedDate={publishedDate} content={content} />}
        {!singlePost && <Blog posts={posts} onPostSelection={onPostSelection} />}
      </Container>
    </>
  );
};

export default BlogContainer;
