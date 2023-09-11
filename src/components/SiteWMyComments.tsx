import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Site } from "../../@types/Site";
import { AppStyles } from "./Shared/AppStyles";
import { useContext, useEffect, useState } from "react";
import { LoginContext } from "./Shared/Context";
import useComments from "../hooks/useComments";
import { CommentType } from "../../@types/CommentType";
import { Comment } from "./Comment";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";

type Props = {
    site: Site;
    deleteSiteFromList: (placeId: string) => void;
}

type StackProps = NativeStackNavigationProp<any, any>;

export const SiteWMyComments = ({ site, deleteSiteFromList }: Props) => {

    const [hasProcessedComments, setHasProcessedComments] = useState(false);

    const navigation = useNavigation<StackProps>();

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
        setHasProcessedComments(true);
    }, []);

    //UseEffect para controlar si la lista de comentarios está vacía
    useEffect(() => {
        if (comments.length === 0 && hasProcessedComments)
            deleteSiteFromList(site.placeId);
    }, [comments]);

    const updateComments = (comment: CommentType, wantsToDelete: boolean) => {
        if (wantsToDelete)
            deleteComment(comment._id);
        else
            updateComment(comment);
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.touchableArea} onPress={() => navigation.navigate("site", {site})}>
                <>
                    <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">{site.nombre}</Text>
                    <Text style={styles.address}>{site.direccion}</Text>
                </>
            </TouchableOpacity>
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
        padding: 12,
        borderColor: AppStyles.border.borderColor,
        borderWidth: AppStyles.border.borderWidth,
        borderRadius: AppStyles.border.borderRadius,
        backgroundColor: AppStyles.white,
        marginBottom: 12
    },
    touchableArea: {
        backgroundColor: '#f7f7f9',  
        borderRadius: 8,            
        padding: 10,                
        shadowColor: '#000',        
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.2,         
        shadowRadius: 2,            
        elevation: 2                
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