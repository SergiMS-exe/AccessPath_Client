import { FlatList, StyleSheet, View, Text, ActivityIndicator, RefreshControl, TouchableOpacity } from "react-native";
import React, { useState } from 'react';
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
    onRefresh?: () => Promise<void>;
    onLoadMore?: () => Promise<void>;
    hasMoreData?: boolean;
    isLoadingMore?: boolean;
}

export const ResultList = ({
    data,
    title,
    noItemsMessage,
    isLoading,
    loadingText,
    progress = 0.5,
    renderItemComponent,
    onRefresh,
    onLoadMore,
    hasMoreData = false,
    isLoadingMore = false
}: Props) => {
    const [refreshing, setRefreshing] = useState(false);

    const handleRefresh = async () => {
        if (onRefresh) {
            setRefreshing(true);
            try {
                await onRefresh();
            } finally {
                setRefreshing(false);
            }
        }
    };

    const handleLoadMore = async () => {
        if (onLoadMore && hasMoreData && !isLoadingMore) {
            await onLoadMore();
        }
    };

    const renderFooter = () => {
        if (data.length === 0) return null;

        if (isLoadingMore) {
            return (
                <View style={styles.loadMoreContainer}>
                    <ActivityIndicator size="small" color={AppStyles.mainBlueColor} />
                </View>
            );
        }

        if (hasMoreData) {
            return (
                <TouchableOpacity
                    style={styles.loadMoreButton}
                    onPress={handleLoadMore}
                    activeOpacity={0.7}
                >
                    <Text style={styles.loadMoreButtonText}>+ Cargar más</Text>
                </TouchableOpacity>
            );
        }

        return (
            <View style={styles.endMessageContainer}>
                <Text style={styles.endMessage}>No hay más resultados</Text>
            </View>
        );
    };

    if (isLoading) {
        if (progress && loadingText)
            return (
                <View style={styles.loadingContainer}>
                    {loadingText && <Text style={styles.loadingText}>{loadingText}</Text>}
                    <Progress.Bar
                        progress={progress}
                        width={200}
                        color={AppStyles.mainBlueColor}
                        borderRadius={5}
                        style={styles.progressBar}
                    />
                </View>
            );
        else
            return <ActivityIndicator size="large" color={AppStyles.mainBlueColor} style={{ marginTop: 20 }} />;
    }

    return (
        <View style={{ flex: 1 }}>
            <FlatList
                key={data.length}
                data={data}
                style={styles.container}
                showsVerticalScrollIndicator={false}
                scrollEnabled={true}
                nestedScrollEnabled={true}
                renderItem={({ item }) => renderItemComponent(item)}
                contentContainerStyle={data.length === 0 ? styles.emptyContent : styles.content}
                ListHeaderComponent={title || null}
                ListEmptyComponent={<Text style={styles.emptyListMessage}>{noItemsMessage}</Text>}
                ListFooterComponent={renderFooter}
                refreshControl={
                    onRefresh ? (
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={handleRefresh}
                            tintColor={AppStyles.mainBlueColor}
                        />
                    ) : undefined
                }
                scrollEventThrottle={16}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
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
        paddingHorizontal: 10,
        paddingTop: 5,
        paddingBottom: 10,
        flexGrow: 1,
    },
    loadingContainer: {
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
    },
    loadMoreButton: {
        marginVertical: 15,
        paddingVertical: 12,
        paddingHorizontal: 30,
        backgroundColor: AppStyles.mainBlueColor,
        borderRadius: 8,
        alignItems: 'center',
        marginHorizontal: 10,
    },
    loadMoreButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
    },
    loadMoreContainer: {
        paddingVertical: 15,
        alignItems: 'center',
    },
    endMessageContainer: {
        paddingVertical: 15,
        alignItems: 'center',
    },
    endMessage: {
        fontSize: 14,
        color: AppStyles.mainBlackColor,
        fontStyle: 'italic',
    },
    emptyContent: {
        flexGrow: 1,
        justifyContent: 'center',
        paddingBottom: 10,
    }
});