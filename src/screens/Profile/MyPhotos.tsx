import { SafeAreaView, View } from "react-native";
import { StackHeader } from "../../components/Headers/StackHeader";
import { useContext, useEffect, useState } from "react";
import { Site } from "../../../@types/Site";
import { getUserPhotos } from "../../services/UserServices";
import { LoginContext, MySitesContext } from "../../components/Shared/Context";
import Snackbar from "react-native-snackbar";
import { ResultList } from "../../components/Card/ResultList";
import PhotoCarousel from "../../components/PhotoCarousel";
import SiteWMyItems from "../../components/SiteWMyItems";
import { AppStyles } from "../../components/Shared/AppStyles";
import { usePaginatedData } from "../../hooks/usePaginatedData";

const MyPhotos = () => {
    const { user } = useContext(LoginContext);

    const {
        data: sitesWithPhotos,
        loading,
        loadingMore,
        hasMoreData,
        loadMore,
        refresh,
        error
    } = usePaginatedData<Site>({
        fetchFunction: async (page, limit) => {
            if (!user) {
                Snackbar.show({
                    text: 'Debes iniciar sesión para ver tus fotos',
                    duration: Snackbar.LENGTH_SHORT,
                    backgroundColor: AppStyles.mainRedColor,
                });
                return { success: false, data: [] };
            }
            
            const response = await getUserPhotos(user, page, limit);
            
            if (!response.success && response.error) {
                Snackbar.show({
                    text: response.error,
                    duration: Snackbar.LENGTH_SHORT,
                    backgroundColor: AppStyles.mainRedColor,
                });
            }
            
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
            <StackHeader title="Mis fotos" />
            <ResultList
                data={sitesWithPhotos}
                noItemsMessage='No has subido ninguna foto'
                isLoading={loading}
                isLoadingMore={loadingMore}
                hasMoreData={hasMoreData}
                onLoadMore={loadMore}
                onRefresh={refresh}
                renderItemComponent={(site) => (
                    <SiteWMyItems site={site}>
                        <View style={{ marginTop: 10 }}>
                            <PhotoCarousel photos={site.fotos} />
                        </View>
                    </SiteWMyItems>
                )}
            />
        </SafeAreaView>
    );
};

export default MyPhotos;