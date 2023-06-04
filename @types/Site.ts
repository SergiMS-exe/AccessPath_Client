export class Site {
    public _id?: number;
    public nombre: string;
    public direccion: string;
    public calificacion: number;
    public location?: Location;
  
    constructor(
      nombre: string,
      direccion: string,
      calificacion: number,
      location?: Location,
      _id?: number
    ) {
      this._id = _id;
      this.nombre = nombre;
      this.direccion = direccion;
      this.calificacion = calificacion;
      this.location = location;
    }
}

export type Location = {
    latitude: number;
    longitude: number;
}