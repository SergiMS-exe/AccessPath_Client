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
    const [mode, setMode] = useState<'view' | 'edit' | 'delete'>('view');
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

    const isUserComment = user && user._id === comment.usuario?._id;

    return (
        <View style={styles.commentContainer}>
            {mode === 'edit' ? (
                <EditCommentMode
                    newText={newText}
                    setNewText={setNewText}
                    handleEdit={handleEdit}
                    cancel={() => setMode('view')}
                />
            ) : mode === 'delete' ? (
                <DeleteCommentMode
                    commentText={comment.texto}
                    displayedName={displayedName}
                    handleDeleting={handleDeleting}
                    cancel={() => setMode('view')}
                />
            ) : (
                <ViewCommentMode
                    commentText={comment.texto}
                    displayedName={displayedName}
                    isUserComment={isUserComment}
                    setMode={setMode}
                />
            )}
        </View>
    );
}

type EditCommentModeProps = {
    newText: string;
    setNewText: (text: string) => void;
    handleEdit: () => void;
    cancel: () => void;
}

function EditCommentMode({ newText, setNewText, handleEdit, cancel }: EditCommentModeProps) {
    return (
        <>
            <TextInput
                style={styles.commentText}
                value={newText}
                onChangeText={setNewText}
            />
            <ActionButtons
                primaryAction={handleEdit}
                cancel={cancel}
            />
        </>
    );
}

type DeleteCommentModeProps = {
    commentText: string;
    displayedName: string;
    handleDeleting: () => void;
    cancel: () => void;
}

function DeleteCommentMode({ commentText, displayedName, handleDeleting, cancel }: DeleteCommentModeProps) {
    return (
        <>
            <Text style={styles.commentText}>{commentText}</Text>
            <Text style={styles.commentUser}>{displayedName}</Text>
            <ActionButtons
                primaryAction={handleDeleting}
                primaryColor='#cf142b'
                primaryIcon="trash"
                cancel={cancel}
            />
        </>
    );
}

type ViewCommentModeProps = {
    commentText: string;
    displayedName: string;
    isUserComment: boolean | undefined;
    setMode: (mode: 'view' | 'edit' | 'delete') => void;
}

function ViewCommentMode({ commentText, displayedName, isUserComment, setMode }: ViewCommentModeProps) {
    return (
        <>
            <Text style={styles.commentText}>{commentText}</Text>
            <Text style={styles.commentUser}>{displayedName}</Text>
            {isUserComment && <View style={styles.editDeleteButtons}>
                <TouchableOpacity onPress={() => setMode('edit')}>
                    <Icon name="pen" size={18} style={{ marginRight: 12 }} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setMode('delete')}>
                    <Icon name="trash" size={18} />
                </TouchableOpacity>
            </View>}
        </>
    );
}

type ActionButtonsProps = {
    primaryAction: () => void;
    primaryColor?: string;
    primaryIcon?: string;
    cancel: () => void;
}

function ActionButtons({ primaryAction, primaryColor = '#007AFF', primaryIcon = 'check', cancel }: ActionButtonsProps) {
    return (
        <View style={styles.editingbuttonsContainer}>
            <TouchableOpacity
                style={{ ...styles.sendButton, marginRight: 5, backgroundColor: primaryColor }}
                onPress={primaryAction}
            >
                <Icon name={primaryIcon} style={styles.sendButtonIcon} />
            </TouchableOpacity>
            <TouchableOpacity style={{ ...styles.sendButton, backgroundColor: '#808080' }} onPress={cancel}>
                <Icon name="times" style={styles.sendButtonIcon} />
            </TouchableOpacity>
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
