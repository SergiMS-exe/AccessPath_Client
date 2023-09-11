export class CommentType {
    _id: string;
    usuario?: {
        _id: string;
        nombre: string;
        apellidos: string;
    };
    usuarioId?: string;
    texto: string;

    constructor(
        _id: string,
        usuarioOrId: { _id: string; nombre: string; apellidos: string; } | string,
        texto: string
    ) {
        this._id = _id;
        this.texto = texto;

        if (typeof usuarioOrId === "string") {
            this.usuarioId = usuarioOrId;
        } else {
            this.usuario = usuarioOrId;
        }
    }
}
