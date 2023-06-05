export class Site {
    public _id?: string;
    public nombre: string;
    public direccion: string;
    public calificacion: number;
    public location?: Location;
    public types: string[];
  
    constructor(
      nombre: string,
      direccion: string,
      calificacion: number,
      types: string[],
      location?: Location,
      _id?: string,
    ) {
      this._id = _id;
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