import React, { useContext, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { LoginContext } from './Shared/Context';
import { deleteComment, editComment } from '../services/PlacesServices';
import { CommentType } from '../../@types/CommentType';

type CommentProps = {
    comment: CommentType;
    updateComments: (comment: CommentType, wantsToDelete: boolean) => void;
    placeId: string;
}

export function Comment({ comment, updateComments, placeId }: CommentProps) {
    const { user } = useContext(LoginContext)

    const [isEditing, setIsEditing] = useState(false);
    const [newText, setNewText] = useState(comment.texto);

    const [isDeleting, setIsDeleting] = useState(false);

    const handleEdit = async () => {
        const newComment = await editComment(placeId, comment._id, newText); //tiene _id, texto y usuarioId
        
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
        await deleteComment(placeId, comment._id)
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
                />

                <View style={styles.editingbuttonsContainer}>
                    <TouchableOpacity style={{ ...styles.sendButton, marginRight: 5, }} onPress={handleEdit}>
                        <Icon name="check" style={styles.sendButtonIcon} />
                    </TouchableOpacity>
                    <TouchableOpacity style={{ ...styles.sendButton, backgroundColor: '#808080' }} onPress={() => setIsEditing(false)}>
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
                    <TouchableOpacity style={{ ...styles.sendButton, marginRight: 5, backgroundColor: '#cf142b' }} onPress={handleDeleting}>
                        <Icon name="trash" style={styles.sendButtonIcon} />
                    </TouchableOpacity>
                    <TouchableOpacity style={{ ...styles.sendButton, backgroundColor: '#808080' }} onPress={() => setIsDeleting(false)}>
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
                        <Icon name="pen" size={18} style={{ marginRight: 12 }} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setIsDeleting(true)}>
                        <Icon name="trash" size={18} />
                    </TouchableOpacity>
                </View>}
            </View>
        );
}

const styles = StyleSheet.create({
    commentContainer: {
        borderWidth: 1.5,
        borderColor: '#ccc', 
        borderRadius: 5,
        padding: 10,
        marginVertical: 5,
    },
    commentText: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 5,
    },
    commentUser: {
        fontSize: 15,
        color: 'gray',
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
