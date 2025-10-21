import { SafeAreaView } from "react-native";
import { StackHeader } from "../../components/Headers/StackHeader";
import { useContext, useEffect, useState } from "react";
import { LoginContext, MySitesContext } from "../../components/Shared/Context";
import { Valoracion } from "../../../@types/Valoracion";
import { Site } from "../../../@types/Site";
import { getSavedSites, getUserRatings } from "../../services/UserServices";
import Snackbar from "react-native-snackbar";
import { ResultList } from "../../components/Card/ResultList";
import SiteWMyItems from "../../components/SiteWMyItems";
import { AddEditRating } from "../../components/AddEditRating";
import { AppStyles } from "../../components/Shared/AppStyles";
import { usePaginatedData } from "../../hooks/usePaginatedData";

export const MySavedSites = () => {
    const { user } = useContext(LoginContext);

    const {
        data: savedSites,
        loading,
        loadingMore,
        hasMoreData,
        loadMore,
        refresh
    } = usePaginatedData<Site>({
        fetchFunction: async (page, limit) => {
            if (!user) return { success: false, data: [] };
            const response = await getSavedSites(user, page, limit);
            return {
                success: response.success,
                data: response.sites,
                pagination: response.pagination,
                error: response.error
            };
        },
        limit: 10
    });

    return (
        <SafeAreaView style={{ flexGrow: 1, backgroundColor: AppStyles.backgroundColor }}>
            <StackHeader title='Sitios Guardados' />
            <ResultList
                data={savedSites}
                noItemsMessage='No tienes sitios guardados'
                isLoading={loading}
                isLoadingMore={loadingMore}
                hasMoreData={hasMoreData}
                onLoadMore={loadMore}
                onRefresh={refresh}
                renderItemComponent={(item) => (
                    <SiteWMyItems site={item.site}>
                        <AddEditRating site={item.site} valoracion={item.valoracion} calledFrom='myRatings' />
                    </SiteWMyItems>
                )}
            />
        </SafeAreaView>
    );
}