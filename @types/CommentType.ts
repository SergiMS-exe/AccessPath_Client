export type CommentType = {
    _id: string;
    usuario: {
        _id: string;
        nombre: string;
        apellidos: string;
    };
    texto: string;
}