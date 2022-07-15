import React, { useEffect } from 'react';
import { frontMatterPost } from '../types/frontMatterPost';
import Blog from './Blog';
import { LocalDataService } from './services/LocalDataService';

const BlogContainer = () => {
    const [posts, setPosts] = React.useState<frontMatterPost[]>(new Array<frontMatterPost>());
    useEffect(() => {
        Promise.all([LocalDataService.getAllPostsWithFrontMatter()]).then((response) => {
            setPosts(response[0]);
        });
    }, []);


    return (
        <Blog posts={posts} />
    );
}

export default BlogContainer;