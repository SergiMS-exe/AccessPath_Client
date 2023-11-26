import React, { useContext, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { LoginContext } from './Shared/Context';
import { deleteComment, editComment } from '../services/PlacesServices';
import { CommentType } from '../../@types/CommentType';
import { AppStyles } from './Shared/AppStyles';
import { useLoading } from '../hooks/useLoading';
import Snackbar from 'react-native-snackbar';

type CommentProps = {
    comment: CommentType;
    updateComments: (comment: CommentType, wantsToDelete: boolean) => void;
    onEditFocus?: () => void;
    onEditBlur?: () => void;
    placeId: string;
}

export function Comment({ comment, updateComments, placeId, onEditFocus, onEditBlur }: CommentProps) {
    const { user } = useContext(LoginContext)

    const [isEditing, setIsEditing] = useState(false);
    const [newText, setNewText] = useState(comment.texto);

    const [isDeleting, setIsDeleting] = useState(false);

    const { isLoading, loading, stopLoading } = useLoading();

    const handleEdit = async () => {
        if (newText.length <= 0) {
            Snackbar.show({
                text: 'El comentario no puede estar vacío',
                duration: Snackbar.LENGTH_LONG,
                backgroundColor: 'red',
            });
            return;
        }
        loading();
        const newComment = await editComment(placeId, comment._id, newText); //tiene _id, texto y usuarioId
        stopLoading();

        if (newComment) {
            const realComment: CommentType = new CommentType(
                newComment._id,
                {
                    _id: newComment.usuarioId,
                    nombre: user!.nombre,
                    apellidos: user!.apellidos,
                },
                newComment.texto
            );
            updateComments(realComment, false)
            setIsEditing(false)
        }
    }

    const handleDeleting = async () => {
        loading();
        await deleteComment(placeId, comment._id)
        stopLoading();
        setIsDeleting(false)
        updateComments(comment, true)
    }

    const displayedName = comment.usuario
        ? `${comment.usuario.nombre} ${comment.usuario.apellidos}`
        : 'usuario desconocido';

    if (isEditing)
        return (
            <View style={styles.commentContainer}>
                <TextInput
                    style={styles.commentText}
                    value={newText}
                    onChangeText={setNewText}
                    onFocus={onEditFocus}
                    onBlur={onEditBlur}
                />

                <View style={styles.editingbuttonsContainer}>
                    <TouchableOpacity style={{ ...styles.sendButton, marginRight: 5, }}
                        onPress={() => {
                            handleEdit();
                            if (onEditBlur)
                                onEditBlur()
                        }} disabled={isLoading}>
                        {
                            isLoading ?
                                <ActivityIndicator color="white" size='small' /> :
                                <Icon name="check" style={styles.sendButtonIcon} />
                        }
                    </TouchableOpacity>
                    <TouchableOpacity style={{ ...styles.sendButton, backgroundColor: '#808080' }}
                        onPress={() => {
                            setIsEditing(false);
                            if (onEditBlur)
                                onEditBlur()
                        }} disabled={isLoading}>
                        <Icon name="times" style={styles.sendButtonIcon} />
                    </TouchableOpacity>
                </View>
            </View>
        )
    else if (isDeleting)
        return (
            <View style={styles.commentContainer}>
                <Text style={styles.commentText}>{comment.texto}</Text>
                <Text style={styles.commentUser}>{displayedName}</Text>
                <View style={styles.editingbuttonsContainer}>
                    <TouchableOpacity style={{ ...styles.sendButton, marginRight: 5, backgroundColor: '#cf142b' }} onPress={handleDeleting} disabled={isLoading}>
                        {isLoading ?
                            <ActivityIndicator color="white" size='small' /> :
                            <Icon name="trash" style={styles.sendButtonIcon} />
                        }
                    </TouchableOpacity>
                    <TouchableOpacity style={{ ...styles.sendButton, backgroundColor: '#808080' }} onPress={() => setIsDeleting(false)} disabled={isLoading}>
                        <Icon name="times" style={styles.sendButtonIcon} />
                    </TouchableOpacity>
                </View>
            </View>
        )
    else
        return (
            <View style={styles.commentContainer}>
                <Text style={styles.commentText}>{comment.texto}</Text>
                <Text style={styles.commentUser}>{displayedName}</Text>
                {user && user._id === comment.usuario?._id && <View style={styles.editDeleteButtons}>
                    <TouchableOpacity onPress={() => setIsEditing(true)}>
                        <Icon name="pen" size={18} style={{ marginRight: 12 }} color={AppStyles.mainBlackColor} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setIsDeleting(true)} >
                        <Icon name="trash" size={18} color={AppStyles.mainBlackColor} />
                    </TouchableOpacity>
                </View>}
            </View>
        );
}

const styles = StyleSheet.create({
    commentContainer: {
        borderWidth: 1,
        borderColor: AppStyles.border.borderColor,
        borderRadius: 5,
        padding: 10,
        marginVertical: 5,
        backgroundColor: AppStyles.white
    },
    commentText: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 5,
        color: AppStyles.secondaryBlackColor
    },
    commentUser: {
        fontSize: 15,
        color: AppStyles.secondaryBlackColor,
    },
    editDeleteButtons: {
        position: 'absolute',
        top: 10,
        right: 10,
        flexDirection: "row",
    },
    sendButton: {
        backgroundColor: '#007AFF',
        borderRadius: 5,
        paddingVertical: 10,
        paddingHorizontal: 15,
    },
    sendButtonIcon: {
        fontSize: 15,
        color: 'white',
    },
    editingbuttonsContainer: {
        position: 'relative',
        bottom: 1,
        right: 5,
        alignSelf: 'flex-end',
        flexDirection: 'row'
    }
});
