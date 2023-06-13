export class CommentType {
    _id: string;
    usuario: {
        _id: string;
        nombre: string;
        apellidos: string;
    };
    texto: string;

    constructor(
        _id: string,
        usuario: {
            _id: string;
            nombre: string;
            apellidos: string;
        },
        texto: string
    ) {
        this._id = _id;
        this.usuario = usuario;
        this.texto = texto;
    }
}
