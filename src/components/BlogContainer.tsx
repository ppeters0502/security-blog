import React, { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { frontMatterPost } from '../types/frontMatterPost';
import { useParams } from 'react-router-dom';
import Blog from './Blog';
import Footer from './Footer';
import Header from './Header';
import Post from './Post';
import { LocalDataService } from './services/LocalDataService';

const BlogContainer = () => {
  const { id, category } = useParams();
  const [posts, setPosts] = React.useState<frontMatterPost[]>(new Array<frontMatterPost>());
  const [singlePost, setSinglePost] = React.useState<boolean>(false);
  const [title, setTitle] = React.useState<string>('');
  const [publishedDate, setPublishedDate] = React.useState<string>('');
  const [content, setContent] = React.useState<string>('');
  const [postCategory, setPostCategory] = React.useState<string>('');

  const getIdNumber = (): number => {
    var _idNumber: number = id ? Number(id) : 0;
    return _idNumber;
  };

  const getPostCategory = (): string => {
    debugger;
    var _postCategory: number = category ? Number(category) : 0;
    var _result: string = '';
    if (_postCategory > 0) {
      if (_postCategory === 1) {
        _result = 'CTF WalkThroughs';
      }
      if (_postCategory === 2) {
        _result = '100 Days of Code';
      }
    } else {
      _result = 'All';
    }
    return _result;
  };

  useEffect(() => {
    let _idNumber = getIdNumber();
    let _postCategory: string = getPostCategory();
    setPostCategory(_postCategory);
    console.log('ID Number: ' + _idNumber);
    Promise.all([LocalDataService.getAllPostsWithFrontMatter()]).then((response) => {
      if (id && _idNumber > 0) {
        let _posts: frontMatterPost[] = response[0];
        _posts.forEach((_post: frontMatterPost) => {
          if (_post.id === _idNumber) {
            setTitle(_post.metaData['title']);
            setPublishedDate(_post.metaData['publishedDate']);
            setContent(_post.content);
            setSinglePost(true);
          }
        });
        if (!singlePost) {
          setPosts(response[0]);
        }
      } else {
        if (category && _postCategory !== 'All') {
          let _posts: frontMatterPost[] = new Array<frontMatterPost>();
          _posts.forEach((_post: frontMatterPost) => {
            let _tags = _post.metaData['tags'];
            _tags.forEach((_tag: string) => {
              console.log('tag: ' + _tag);
              if (_tag === _postCategory) {
                _posts.push(_post);
              }
            });
            setPosts(_posts);
          });
        } else {
          setPosts(response[0]);
        }
      }
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
        {!singlePost && <Blog posts={posts} category={postCategory} onPostSelection={onPostSelection} />}
      </Container>
      <Footer />
    </>
  );
};

export default BlogContainer;
