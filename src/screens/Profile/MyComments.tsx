import { SafeAreaView, StyleSheet } from "react-native";
import { StackHeader } from "../../components/Headers/StackHeader";
import { useContext, useEffect, useState } from "react";
import { LoginContext, MySitesContext } from "../../components/Shared/Context";
import { getUserComments } from "../../services/UserServices";
import { Site } from "../../../@types/Site";
import SiteWMyItems from '../../components/SiteWMyItems';
import { ResultList } from "../../components/Card/ResultList";
import CommentList from "../../components/CommentList";
import { AppStyles } from "../../components/Shared/AppStyles";
import { usePaginatedData } from "../../hooks/usePaginatedData";

export const MyComments = () => {
    const { user } = useContext(LoginContext);

    const {
        data: myComments,
        loading,
        loadingMore,
        hasMoreData,
        loadMore,
        refresh,
        setData
    } = usePaginatedData<Site>({
        fetchFunction: async (page, limit) => {
            if (!user) return { success: false, data: [] };
            const response = await getUserComments(user, page, limit);
            return {
                success: response.success,
                data: response.sites,
                pagination: response.pagination,
                error: response.error
            };
        },
        limit: 10
    });

    const deleteSiteFromList = (placeId: string) => {
        const newSites = myComments.filter(site => site.placeId !== placeId);
        setData(newSites);
    };

    return (
        <SafeAreaView style={{ flexGrow: 1, backgroundColor: AppStyles.backgroundColor }}>
            <StackHeader title='Mis Comentarios' />
            <ResultList
                data={myComments}
                noItemsMessage='No has comentado en ningún sitio'
                isLoading={loading}
                isLoadingMore={loadingMore}
                hasMoreData={hasMoreData}
                onLoadMore={loadMore}
                onRefresh={refresh}
                renderItemComponent={(site) => (
                    <SiteWMyItems site={site}>
                        <CommentList site={site} deleteSiteFromList={deleteSiteFromList} />
                    </SiteWMyItems>
                )}
            />
        </SafeAreaView>
    );
};


const styles = StyleSheet.create({
    listContainer: {
        margin: 10,
    }
});