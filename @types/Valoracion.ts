export interface Valoracion {
    placeId?: string;
    userId?: string;
    fisica?: {
        average: number;
        valoracion: Record<FisicaKey, number>;
    } | Record<FisicaKey, number>;
    sensorial?: {
        average: number;
        valoracion: Record<SensorialKey, number>;
    } | Record<SensorialKey, number>;
    psiquica?: {
        average: number;
        valoracion: Record<PsiquicaKey, number>;
    } | Record<PsiquicaKey, number>;

}

// Enums para las valoraciones
export enum FisicaEnum {
    entrada = 'Entradas/Salidas',
    taza_bano = 'Taza del baño',
    rampas = 'Rampas',
    ascensores = 'Ascensores',
    pasillos = 'Pasillos',
    banos_adaptados = 'Baños Adaptados',
    senaletica_clara = 'Señalización Clara',
}

export enum SensorialEnum {
    senaletica_braille = 'Señalización Braille',
    sistemas_amplificacion = 'Sistemas de Amplificación',
    iluminacion_adecuada = 'Iluminación Adecuada',
    informacion_accesible = 'Información Accesible',
    pictogramas_claros = 'Pictogramas Claros'
}

export enum PsiquicaEnum {
    informacion_simple = 'Información Simple',
    senaletica_intuitiva = 'Señalización Intuitiva',
    espacios_tranquilos = 'Espacios Tranquilos',
    interaccion_personal = 'Interacción del Personal'
}

export enum TypesOfDisabilities {
    fisica = 'Física',
    sensorial = 'Sensorial',
    psiquica = 'Psíquica',
    ninguna = 'Ninguna'
}

export type TypesOfDisabilitiesKey = keyof typeof TypesOfDisabilities;
export type FisicaKey = keyof typeof FisicaEnum;
export type SensorialKey = keyof typeof SensorialEnum;
export type PsiquicaKey = keyof typeof PsiquicaEnum;

export const reverseFisicaEnum = Object.entries(FisicaEnum).reduce((acc, [key, value]) => {
    acc[value] = key;
    return acc;
}, {} as { [key: string]: string });

export const reverseSensorialEnum = Object.entries(SensorialEnum).reduce((acc, [key, value]) => {
    acc[value] = key;
    return acc;
}, {} as { [key: string]: string });

export const reversePsiquicaEnum = Object.entries(PsiquicaEnum).reduce((acc, [key, value]) => {
    acc[value] = key;
    return acc;
}, {} as { [key: string]: string });
