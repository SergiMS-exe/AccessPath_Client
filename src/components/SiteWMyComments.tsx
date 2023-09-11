import { FlatList, StyleSheet, Text, View } from "react-native";
import { Site } from "../../@types/Site";
import { AppStyles } from "./Shared/AppStyles";
import { useContext, useEffect, useState } from "react";
import { LoginContext } from "./Shared/Context";
import useComments from "../hooks/useComments";
import { CommentType } from "../../@types/CommentType";
import { Comment } from "./Comment";

type Props = {
    site: Site;
}

export const SiteWMyComments = ({ site }: Props) => {

    const { user } = useContext(LoginContext);
    const { comments, setComments, deleteComment, updateComment } = useComments();

    //UseEffect para cambiar los usuarioId de los comentarios por un objeto usuario
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
    }, []);

    const updateComments = (comment: CommentType, wantsToDelete: boolean) => {
        if (wantsToDelete)
            deleteComment(comment._id);
        else
            updateComment(comment);
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">{site.nombre}</Text>
            <Text style={styles.address}>{site.direccion}</Text>
            <FlatList
                style={styles.commentsContainer}
                data={comments}
                renderItem={({ item }) => <Comment comment={item} updateComments={updateComments} placeId={site.placeId} />}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        //height: 120,
        padding: 12,
        borderColor: AppStyles.border.borderColor,
        borderWidth: AppStyles.border.borderWidth,
        borderRadius: AppStyles.border.borderRadius,
        backgroundColor: AppStyles.white,
        marginBottom: 12
    },
    title: {
        fontSize: AppStyles.card.titleSize,
        marginBottom: 5,
        fontWeight: 'bold',
    },
    address: {
        marginBottom: 4
    },
    commentsContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        marginTop: 5
    },
});