import { CommentType } from "./CommentType";


export class Site {
    public placeId: string;
    public nombre: string;
    public direccion: string;
    public calificacionGoogle: number;
    public comentarios?: CommentType[];
    public location: Location;
    public types: string[];

    constructor(
      placeId: string,
      nombre: string,
      direccion: string,
      calificacionGoogle: number,
      location: Location,
      types: string[],
      comentarios?: CommentType[]
    ) {
      this.placeId = placeId;
      this.nombre = nombre;
      this.direccion = direccion;
      this.calificacionGoogle = calificacionGoogle;
      this.location = location;
      this.types = types;
      this.comentarios = comentarios;
    }
}

export type Location = {
    latitude: number;
    longitude: number;
}