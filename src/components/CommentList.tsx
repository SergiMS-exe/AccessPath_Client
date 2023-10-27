// CommentsList.tsx
import React, { useContext, useEffect, useState } from "react";
import { FlatList, StyleSheet } from "react-native";
import { CommentType } from "../../@types/CommentType";
import { Comment } from "./Comment";
import { LoginContext } from "./Shared/Context";
import useComments from "../hooks/useComments";
import { Site } from "../../@types/Site";

type Props = {
    site: Site;
    deleteSiteFromList: (placeId: string) => void;
}

const CommentList = ({ site, deleteSiteFromList }: Props) => {
    const { user } = useContext(LoginContext);
    const { comments, setComments, deleteComment, updateComment } = useComments();
    const [hasProcessedComments, setHasProcessedComments] = useState(false);

    useEffect(() => {
        if (user && site.comentarios) {
            site.comentarios?.forEach(comment => {
                if (comment.usuarioId === user._id) {
                    comment.usuario = {
                        _id: user._id,
                        nombre: user.nombre,
                        apellidos: user.apellidos
                    };
                    delete comment.usuarioId;
                }
            });
        }
        setComments(site.comentarios!);
        setHasProcessedComments(true);
    }, [user, site]);

    useEffect(() => {
        if (comments.length === 0 && hasProcessedComments) {
            deleteSiteFromList(site.placeId);
        }
    }, [comments, hasProcessedComments, deleteSiteFromList, site]);

    const updateComments = (comment: CommentType, wantsToDelete: boolean) => {
        if (wantsToDelete) {
            deleteComment(comment._id);
        } else {
            updateComment(comment);
        }
    };

    return (
        <FlatList
            style={styles.commentsContainer}
            data={comments}
            renderItem={({ item }) => (
                <Comment
                    comment={item}
                    updateComments={updateComments}
                    placeId={site.placeId}
                />
            )}
        />
    );
};

const styles = StyleSheet.create({
    commentsContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        marginTop: 5
    },
});

export default CommentList;
