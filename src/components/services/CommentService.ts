import axios, {AxiosPromise} from 'axios';
import { SingleCommentProps } from '../../types/SingleCommentProps';
import { DynamoResponse } from '../../types/DynamoResponse';

export namespace CommentService {
    export const _baseURL = process.env.REACT_APP_COMMENTS_API;
    export function getCommentsFromPost(postId: number): AxiosPromise<DynamoResponse> {
        let _url = _baseURL + '/comments?postID='+postId;
        return axios.get(_url);
    }
    export function createComment(comment: SingleCommentProps) {
        let _url = _baseURL + '/comments';
        let _data = {
            "post_id": ''+comment.postID+'',
            "text": comment.text,
            "author": comment.author,
            "post_date": new Date().toLocaleString()
        };
        return axios.post(_url, _data);
    }
}