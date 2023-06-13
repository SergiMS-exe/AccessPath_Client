import React, { useContext, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { LoginContext } from './Shared/Context';
import { editComment } from '../services/PlacesServices';
import { CommentType } from '../../@types/CommentType';

type CommentProps = {
    comment: CommentType;
    updateComments: (newComments: CommentType) => void;
    placeId: string;
}

export function Comment({ comment, updateComments, placeId }: CommentProps) {
    const { user } = useContext(LoginContext)

    const [isEditing, setIsEditing] = useState(false);
    const [newText, setNewText] = useState(comment.texto);


    const handleEdit = async () => {
        const newComment = await editComment(placeId, comment._id, newText); //tiene _id, texto y usuarioId
        const realComment: CommentType = new CommentType(
            newComment._id,
            {
                _id: newComment.usuarioId,
                nombre: user!.nombre,
                apellidos: user!.apellidos,
            },
            newComment.texto
        );
        if (newComment) {
            updateComments(realComment)
            setIsEditing(false)
        }
    }

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
                        <Icon name="pen" style={styles.sendButtonIcon} />
                    </TouchableOpacity>
                    <TouchableOpacity style={{ ...styles.sendButton, backgroundColor: '#cf142b' }} onPress={() => setIsEditing(false)}>
                        <Icon name="times" style={styles.sendButtonIcon} />
                    </TouchableOpacity>
                </View>
            </View>
        )
    else
        return (
            <View style={styles.commentContainer}>
                <Text style={styles.commentText}>{comment.texto}</Text>
                <Text style={styles.commentUser}>{`${comment.usuario.nombre} ${comment.usuario.apellidos}`}</Text>
                {user && user._id === comment.usuario._id && <View style={styles.editDeleteButtons}>
                    <TouchableOpacity onPress={() => setIsEditing(true)}>
                        <Icon name="pen" size={15} style={{ marginRight: 7 }} />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Icon name="trash" size={15} />
                    </TouchableOpacity>
                </View>}
            </View>
        );
}

const styles = StyleSheet.create({
    commentContainer: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 5,
        padding: 10,
        marginVertical: 5,
    },
    commentText: {
        fontSize: 18,
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
