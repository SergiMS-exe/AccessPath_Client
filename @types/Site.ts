export class Site {
    public placeId: string;
    public nombre: string;
    public direccion: string;
    public calificacion: number;
    public location: Location;
    public types: string[];
  
    constructor(
      nombre: string,
      direccion: string,
      calificacion: number,
      types: string[],
      location: Location,
      placeId: string,
    ) {
      this.placeId = placeId;
      this.nombre = nombre;
      this.direccion = direccion;
      this.calificacion = calificacion;
      this.location = location;
      this.types = types
    }
}

export type Location = {
    latitude: number;
    longitude: number;
}