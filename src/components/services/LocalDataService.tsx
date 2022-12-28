import remarkFrontmatter from 'remark-frontmatter';
import remarkParse from 'remark-parse/lib';
import remarkStringify from 'remark-stringify/lib';
import { unified } from 'unified';
import { frontMatterPost } from '../../types/frontMatterPost';
import extract from 'remark-extract-frontmatter';
import { VFile } from 'vfile-matter';

export module LocalDataService {
  const yaml = require('yaml').parse
  export async function getAllPostsWithFrontMatter() {
    const importAll = (r: any) => r.keys().map(r);
    const markDownFiles = importAll(require.context('../../data', true, /\.md$/));
    const files = await Promise.all(markDownFiles.map((file: any) => fetch(file.default).then((res) => res.text())));
    const _returnData: frontMatterPost[] = new Array<frontMatterPost>();
    files.forEach(async (file: string) => {
      unified()
        .use(remarkParse)
        .use(remarkStringify)
        .use(remarkFrontmatter, ['yaml'])
        .use(extract, { yaml: yaml, remove: true })
        .process(file, (err, vfile: VFile | undefined) => {
          if (vfile !== undefined) {
            console.log('ID: ' + vfile.data['id'] + ' featureImage: ' + vfile.data['featureImage']);
            let metaData = vfile.data as unknown as frontMatterPost;
            console.log(metaData.featureImage);
            _returnData.push({
              id: Number(metaData.id),
              metaData: metaData,
              content: vfile.toString(),
              featureImage: metaData.featureImage,
            });
          }

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
    files.forEach(async (file: string) => {
      unified()
        .use(remarkParse)
        .use(remarkStringify)
        .use(remarkFrontmatter, ['yaml'])
        .use(extract, { yaml: yaml, remove: true })
        .process(file, (err, vfile: VFile | undefined) => {
          if (vfile !== undefined) {
            let metaData = vfile.data.matter as frontMatterPost;
            const _id = Number(metaData.id);
            if (_id !== 0 && _id === id) {
              console.log(metaData.featureImage);
              result = {
                id: _id,
                metaData: metaData,
                content: vfile.toString(),
                featureImage: metaData.featureImage,
              };
            }

          }

        });
    });

    return result;
  }
}
