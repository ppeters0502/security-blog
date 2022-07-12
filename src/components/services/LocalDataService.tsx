import matter from 'gray-matter';
import { frontMatterPost } from '../../types/frontMatterPost';

export module LocalDataService {
  export function getAllPostsWithFrontMatter() {
    const fs = require('fs');
    const path = require('path');

    const files = fs.readdirSync('../../data', 'utf-8');
    const _returnData: frontMatterPost[] = new Array<frontMatterPost>();
    files.forEach((file: string) => {
      const source = fs.readFileSync(path.join('../../data/', file), 'utf-8');
      const { data, content } = matter(source);
      _returnData.push({
        metaData: data,
        content: content,
      });
    });

    return _returnData;
  }
}
