import matter from 'gray-matter';
import { frontMatterPost } from '../../types/frontMatterPost';

export module LocalDataService {
  export async function getAllPostsWithFrontMatter() {

    const importAll = (r: any) => r.keys().map(r);
    const markDownFiles = importAll(require.context('../../data', true, /\.md$/));

    console.log(JSON.stringify(markDownFiles));
    const files = await Promise.all(markDownFiles.map((file: any) => fetch(file.default).then((res) => res.text())));
    const _returnData: frontMatterPost[] = new Array<frontMatterPost>();
    files.forEach((file: string) => {
      const { data, content } = matter(file);
      _returnData.push({
        metaData: data,
        content: content,
      });
    });

    return _returnData;
  }
}

