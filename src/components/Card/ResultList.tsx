import { FlatList, StyleSheet, View, Text, ActivityIndicator } from "react-native";
import React from 'react';
import * as Progress from 'react-native-progress';
import { AppStyles } from "../Shared/AppStyles";

type Props = {
    data: any[];
    title?: JSX.Element;
    noItemsMessage: string;
    isLoading?: boolean;
    loadingText?: string;
    progress?: number;
    renderItemComponent: (item: any) => JSX.Element;
}

export const ResultList = ({ data, title, noItemsMessage, isLoading, loadingText, progress = 0.5, renderItemComponent }: Props) => {

    if (isLoading) {
        if (progress && loadingText)
            return (
                <View style={styles.loadingContainer}>
                    {loadingText && <Text style={styles.loadingText}>{loadingText}</Text>}
                    <Progress.Bar
                        progress={progress}
                        width={200}
                        color={AppStyles.mainBlueColor}//"#4caf50"
                        borderRadius={5}
                        style={styles.progressBar}
                    />
                </View>
            );
        else
            return <ActivityIndicator size="large" color={AppStyles.mainBlueColor} style={{ marginTop: 20 }} />;
    }

    if (data.length === 0) {
        return <Text style={styles.emptyListMessage}>{noItemsMessage}</Text>;
    }

    return (
        <FlatList
            key={data.length}
            data={data}
            style={styles.container}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => renderItemComponent(item)}
            contentContainerStyle={styles.content}
            ListHeaderComponent={title || null}
        />
    );
}

const styles = StyleSheet.create({
    container: {
        margin: 10,
        padding: 5,
        flex: 1
    },
    emptyListMessage: {
        fontSize: 20,
        fontWeight: '700',
        textAlign: 'center',
        color: AppStyles.black,
        marginTop: 20
    },
    content: {
        flexGrow: 1,
    },
    loadingContainer: {
        //flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20
    },
    loadingText: {
        fontSize: 18,
        marginBottom: 10,
        textAlign: 'center',
        color: AppStyles.mainBlackColor
    },
    progressBar: {
        marginTop: 10,
    }
});
