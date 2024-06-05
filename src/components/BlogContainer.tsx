import React, { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { frontMatterPost } from '../types/frontMatterPost';
import { useParams } from 'react-router-dom';
import Blog from './Blog';
import Footer from './Footer';
import Header from './Header';
import Post from './Post';
import { LocalDataService } from './services/LocalDataService';
import { CommentService } from '../services/API/CommentService';
import { AxiosResponse } from 'axios';
import { SingleCommentProps } from '../types/SingleCommentProps';

const BlogContainer = () => {
  const { id, category } = useParams();
  const [posts, setPosts] = React.useState<frontMatterPost[]>(new Array<frontMatterPost>());
  const [singlePost, setSinglePost] = React.useState<boolean>(false);
  const [title, setTitle] = React.useState<string>('');
  const [publishedDate, setPublishedDate] = React.useState<string>('');
  const [content, setContent] = React.useState<string>('');
  const [postCategory, setPostCategory] = React.useState<string>('');
  const [categoryFilter, setCategoryFilter] = React.useState<string>('');
  const [postComments, setPostComments] = React.useState<SingleCommentProps[]>(new Array<SingleCommentProps>());
  const [postID, setPostID] = React.useState<number>(0);
  const [commentAuthor, setCommentAuthor] = React.useState<string>('');
  const [commentText, setCommentText] = React.useState<string>('');
  const getIdNumber = (): number => {
    var _idNumber: number = id ? Number(id) : 0;
    return _idNumber;
  };

  const getPostCategory = (): string => {
    var _postCategory: number = category ? Number(category) : 0;
    var _result: string = '';
    if (_postCategory > 0) {
      switch (_postCategory) {
        case 1:
          _result = 'ctf_walkthroughs';
          break;
        case 2:
          _result = '100_days';
          break;
        case 3:
          _result = 'misc.';
          break;
        default:
          _result = 'all';
          break;
      }
    } else {
      _result = 'all';
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
        setSinglePost(true);
        setPostID(_idNumber);
        // Get Comments from single post
        CommentService.getCommentsFromPost(_idNumber).then((response: AxiosResponse<SingleCommentProps[]>) => {
          let _publishedComments: SingleCommentProps[] = new Array<SingleCommentProps>();
          response.data.forEach((_comment: SingleCommentProps) => {
            if (_comment.postID === _idNumber) {
              _publishedComments.push(_comment);
            }
          });
          setPostComments(_publishedComments);
        });
        let _posts: frontMatterPost[] = response[0];
        _posts.forEach((_post: frontMatterPost) => {
          if (_post.id === _idNumber) {
            setTitle(_post.metaData['title']);
            setPublishedDate(_post.metaData['publishedDate']);
            setContent(_post.content);
          }
        });
        if (!singlePost) {
          setPosts(response[0]);
        }
      } else {
        if (category && _postCategory !== 'all') {
          let _posts: frontMatterPost[] = new Array<frontMatterPost>();
          response[0].forEach((_post: frontMatterPost) => {
            let _tags: string[] = new Array<string>();
            if (_post.metaData['tags']) {
              _tags = _post.metaData['tags'];
              _tags.forEach((_tag: string) => {
                console.log('tag: ' + _tag);
                if (_tag === _postCategory) {
                  _posts.push(_post);
                }
              });
            }
          });
          setPosts(_posts);
          categoryFilterSelection(_postCategory);
        } else {
          setPosts(response[0]);
          categoryFilterSelection('all');
        }
      }
    });
  }, []);

  const categoryFilterSelection = (category: string) => {
    switch (category) {
      case 'all':
        setCategoryFilter('All');
        break;
      case '100_days':
        setCategoryFilter('100 Days of Code');
        break;
      case 'ctf_walkthroughs':
        setCategoryFilter('CTF Walkthroughs');
        break;
      case 'misc.':
        setCategoryFilter('Miscellaneous');
        break;
      default:
        setCategoryFilter('All');
        break;
    }
  };

  const onCategorySelection = (category: string) => {
    Promise.all([LocalDataService.getAllPostsWithFrontMatter()]).then((response) => {
      if (category !== 'all') {
        let _posts: frontMatterPost[] = new Array<frontMatterPost>();
        response[0].forEach((_post: frontMatterPost) => {
          let _tags: string[] = new Array<string>();
          if (_post.metaData['tags']) {
            _tags = _post.metaData['tags'];
            _tags.forEach((_tag: string) => {
              console.log('tag: ' + _tag);
              if (_tag === category) {
                _posts.push(_post);
              }
            });
          }
        });
        setPosts(_posts);
      } else {
        setPosts(response[0]);
      }
      setPostCategory(category);
      categoryFilterSelection(category);
    });
  };

  const onPostSelection = (post: frontMatterPost) => {
    // Get Comments from single post
    CommentService.getCommentsFromPost(post.id).then((response: AxiosResponse<SingleCommentProps[]>) => {
      let _publishedComments: SingleCommentProps[] = new Array<SingleCommentProps>();
      response.data.forEach((_comment: SingleCommentProps) => {
        if (_comment.postID === post.id) {
          _publishedComments.push(_comment);
        }
      });
      setPostComments(_publishedComments);
    });
    setTitle(post.metaData['title']);
    setPublishedDate(post.metaData['publishedDate']);
    setContent(post.content);
    setSinglePost(true);
    setPostID(post.id);
  };

  const onCommentSubmission = (comment: SingleCommentProps): boolean => {
    CommentService.createComment(comment).then((response: AxiosResponse) => {
      setCommentText('');
      setCommentAuthor('');
      return response.statusText.toLowerCase() == 'success' ? true : false;
    });
    return false;
  };

  //     title: string;
  //   publishedDate: string;
  //   content: string;

  return (
    <>
      <Header />
      <Container>
        {singlePost && (
          <Post
            title={title}
            publishedDate={publishedDate}
            content={content}
            comments={postComments}
            setPostComments={setPostComments}
            onCommentSubmission={onCommentSubmission}
            postID={postID}
            commentAuthor={commentAuthor}
            commentText={commentText}
            setCommentAuthor={setCommentAuthor}
            setCommentText={setCommentText}
          />
        )}
        {!singlePost && <Blog posts={posts} category={postCategory} onPostSelection={onPostSelection} onCategorySelection={onCategorySelection} categoryFilter={categoryFilter} />}
      </Container>
      <Footer />
    </>
  );
};

export default BlogContainer;
