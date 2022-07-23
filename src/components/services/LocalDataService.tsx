import matter from 'gray-matter';
import { frontMatterPost } from '../../types/frontMatterPost';

export module LocalDataService {
  export async function getAllPostsWithFrontMatter() {
    const importAll = (r: any) => r.keys().map(r);
    const markDownFiles = importAll(require.context('../../data', true, /\.md$/));
    const files = await Promise.all(markDownFiles.map((file: any) => fetch(file.default).then((res) => res.text())));
    const _returnData: frontMatterPost[] = new Array<frontMatterPost>();
    files.forEach((file: string) => {
      const { data, content } = matter(file);
      _returnData.push({
        id: Number(data['id']),
        metaData: data,
        content: content,
        featuredImage: data['featureImage'],
      });
    });

    _returnData.sort((a, b) => (a.id > b.id ? -1 : 1));

    return _returnData;
  }

  export async function getIndividualPost(id: number) {
    const importAll = (r: any) => r.keys().map(r);
    const markDownFiles = importAll(require.context('../../data', true, /\.md$/));
    const files = await Promise.all(markDownFiles.map((file: any) => fetch(file.default).then((res) => res.text())));
    let result: frontMatterPost | undefined = undefined;
    files.forEach((file: string) => {
      const { data, content } = matter(file);
      const _id = Number(data['id']);
      if (_id !== 0 && _id === id) {
        result = {
          id: _id,
          metaData: data,
          content: content,
          featuredImage: data['featureImage'],
        };
      }
    });

    return result;
  }
}
