import React from 'react';
import axios, {AxiosPromise} from 'axios';
import { SingleCommentProps } from '../../types/SingleCommentProps';


export module CommentService {
    export const _baseURL = 'http://localhost:3001';
    export function getCommentsFromPost(postId: number): AxiosPromise<SingleCommentProps> => {
        
    }
}