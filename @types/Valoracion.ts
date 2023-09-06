export interface Valoracion {
    userId: string;
    rating: number;
}

export interface CategoriaValoracion {
    average: number;
    ratings: Valoracion[];
}