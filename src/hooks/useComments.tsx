import { useState } from 'react';
import { CommentType } from '../../@types/CommentType';

const useComments = (initialComments: CommentType[] = []) => {
    const [comments, setComments] = useState<CommentType[]>(initialComments);

    const addComment = (newComment: CommentType) => {
        setComments(prevComments => [...prevComments, newComment]);
    };

    const deleteComment = (commentId: string) => {
        setComments(prevComments => prevComments.filter(c => c._id !== commentId));
    };

    const updateComment = (comment: CommentType) => {
        setComments(prevComments => prevComments.map(c => c._id === comment._id ? comment : c));
    };

    return {
        comments,
        setComments,
        addComment,
        deleteComment,
        updateComment
    };
};


export default useComments;
