import { TypesOfDisabilities, Valoracion } from '../../@types/Valoracion';

export const useRatings = () => {
    const getDisabilitiesIcon = (disability: string = "ninguna") => {
        switch (disability) {
            case TypesOfDisabilities.fisica:
                return "wheelchair";
            case TypesOfDisabilities.sensorial:
                return "eye";
            case TypesOfDisabilities.psiquica:
                return "brain";
            default:
                return "user";
        }
    }

    const getMainCategoryRating = (categoryKey: string, media: Valoracion | undefined,): number | null => {
        categoryKey = categoryKey.toLowerCase().replace(/í/g, "i")
        if (media) {
            const categoryData = media[categoryKey as keyof Valoracion] as any;
            if (categoryData && categoryData.average) {
                return categoryData.average;
            }
        }
        return null;
    }

    return { getDisabilitiesIcon, getMainCategoryRating }
}
