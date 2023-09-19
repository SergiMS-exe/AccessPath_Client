export interface Valoracion {
    placeId?: string;
    userId?: string;
    fisica?: Record<FisicaKey, number>;
    sensorial?: Record<SensorialKey, number>;
    psiquica?: Record<PsiquicaKey, number>;

}

// Defining enums from the provided keys
export enum FisicaEnum {
    entrada = 'Entradas/Salidas',
    taza_bano = 'Taza del baño',
    rampas = 'Rampas',
    ascensores = 'Ascensores',
    pasillos = 'Pasillos',
    banos_adaptados = 'Baños Adaptados',
    senaletica_clara = 'Señalética Clara'
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

export type FisicaKey = keyof typeof FisicaEnum;
export type SensorialKey = keyof typeof SensorialEnum;
export type PsiquicaKey = keyof typeof PsiquicaEnum;