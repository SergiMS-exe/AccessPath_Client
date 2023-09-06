import { CommentType } from "./CommentType";
import { CategoriaValoracion } from "./Valoracion";

export type Location = {
    latitude: number;
    longitude: number;
};

export class Site {
    public placeId: string;
    public nombre: string;
    public direccion: string;
    public calificacionGoogle: number;
    public comentarios?: CommentType[];
    public location: Location;
    public types: string[];
    public valoraciones?: {
        fisica?: {
            average: number;
            entrada?: CategoriaValoracion;
            taza_bano?: CategoriaValoracion;
            rampas?: CategoriaValoracion;
            ascensores?: CategoriaValoracion;
            pasillos?: CategoriaValoracion;
            banos_adaptados?: CategoriaValoracion;
            senaletica_clara?: CategoriaValoracion;
        };
        sensorial?: {
            average: number;
            senaletica_braille?: CategoriaValoracion;
            sistemas_amplificacion?: CategoriaValoracion;
            iluminacion_adecuada?: CategoriaValoracion;
            informacion_accesible?: CategoriaValoracion;
            pictogramas_claros?: CategoriaValoracion;
        };
        psiquico: {
            average: number;
            informacion_simple?: CategoriaValoracion;
            senaletica_intuitiva?: CategoriaValoracion;
            espacios_tranquilos?: CategoriaValoracion;
            interaccion_personal?: CategoriaValoracion;
        };
    };

    constructor(
        placeId: string,
        nombre: string,
        direccion: string,
        calificacionGoogle: number,
        location: Location,
        types: string[],
        valoraciones?: {
            fisica?: {
                average: number;
                entrada?: CategoriaValoracion;
                taza_bano?: CategoriaValoracion;
                rampas?: CategoriaValoracion;
                ascensores?: CategoriaValoracion;
                pasillos?: CategoriaValoracion;
                banos_adaptados?: CategoriaValoracion;
                senaletica_clara?: CategoriaValoracion;
            };
            sensorial?: {
                average: number;
                senaletica_braille?: CategoriaValoracion;
                sistemas_amplificacion?: CategoriaValoracion;
                iluminacion_adecuada?: CategoriaValoracion;
                informacion_accesible?: CategoriaValoracion;
                pictogramas_claros?: CategoriaValoracion;
            };
            psiquico: {
                average: number;
                informacion_simple?: CategoriaValoracion;
                senaletica_intuitiva?: CategoriaValoracion;
                espacios_tranquilos?: CategoriaValoracion;
                interaccion_personal?: CategoriaValoracion;
            };
        },
        comentarios?: CommentType[]
    ) {
        this.placeId = placeId;
        this.nombre = nombre;
        this.direccion = direccion;
        this.calificacionGoogle = calificacionGoogle;
        this.location = location;
        this.types = types;
        this.valoraciones = valoraciones;
        this.comentarios = comentarios;
    }
}
