import { useContext } from "react";
import { SafeAreaView } from "react-native";
import Snackbar from "react-native-snackbar";
import { Site } from "../../../@types/Site";
import { Valoracion } from "../../../@types/Valoracion";
import { AddEditRating } from "../../components/AddEditRating";
import { ResultList } from "../../components/Card/ResultList";
import { StackHeader } from "../../components/Headers/StackHeader";
import { AppStyles } from "../../components/Shared/AppStyles";
import { LoginContext } from "../../components/Shared/Context";
import SiteWMyItems from "../../components/SiteWMyItems";
import { usePaginatedData } from "../../hooks/usePaginatedData";
import { getUserRatings } from "../../services/UserServices";

export const MyRatings = () => {
    const { user } = useContext(LoginContext);

    const {
        data: myRatings,
        loading,
        loadingMore,
        hasMoreData,
        loadMore,
        refresh,
        error
    } = usePaginatedData<{ valoracion: Valoracion, site: Site }>({
        fetchFunction: async (page, limit) => {
            if (!user) return { success: false, data: [] };
            
            const response = await getUserRatings(user, page, limit);
            
            if (!response.success && response.error) {
                Snackbar.show({
                    text: response.error,
                    duration: Snackbar.LENGTH_LONG,
                    backgroundColor: "red",
                });
            }
            
            return {
                success: response.success,
                data: response.sitesWRatings,
                pagination: response.pagination,
                error: response.error
            };
        },
        limit: 10
    });

    return (
        <SafeAreaView style={{ flexGrow: 1, backgroundColor: AppStyles.backgroundColor }}>
            <StackHeader title='Mis Valoraciones' />
            <ResultList
                data={myRatings}
                noItemsMessage="No tienes valoraciones"
                isLoading={loading}
                isLoadingMore={loadingMore}
                hasMoreData={hasMoreData}
                onLoadMore={loadMore}
                onRefresh={refresh}
                renderItemComponent={(item) => (
                    <SiteWMyItems site={item.site}>
                        <AddEditRating 
                            site={item.site} 
                            valoracion={item.valoracion} 
                            calledFrom='myRatings' 
                        />
                    </SiteWMyItems>
                )}
            />
        </SafeAreaView>
    );
};
