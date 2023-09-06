import { SafeAreaView } from "react-native";
import { StackHeader } from "../../components/Headers/StackHeader";
import { useContext, useEffect, useState } from "react";
import { getCommentsByUser } from "../../services/PlacesServices";
import { LoginContext } from "../../components/Shared/Context";
import { CommentType } from "../../../@types/CommentType";

export const MyComments = () => {
    const { user } = useContext(LoginContext);

    const [comments, setComments] = useState<CommentType[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const comments = await getCommentsByUser(user!)
            setComments(comments);
        }
        fetchData();
    });

    return (
        <SafeAreaView style={{flexGrow:1}}>
            <StackHeader title='Mis Comentarios'/>
        </SafeAreaView>
    );
}