import axios, {AxiosPromise} from 'axios';
import { SingleCommentProps } from '../../types/SingleCommentProps';


export namespace CommentService {
    export const _baseURL = 'http://localhost:3001';
    export function getCommentsFromPost(postId: number): AxiosPromise<SingleCommentProps[]> {
        let _url = _baseURL + '/comments';
        return axios.get(_url);
    }
    export function createComment(comment: SingleCommentProps) {
        let _url = _baseURL + '/comments';
        let _data = {
            "postID": comment.postID,
            "text": comment.text,
            "author": comment.author,
            "postDate": new Date().toLocaleString()
        };
        return axios.post(_url, _data)
    }
}